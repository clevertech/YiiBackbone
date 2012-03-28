define([
  'jquery', 
  'underscore', 
  'backbone',
  'models/comment',
  'views/comment/item',
  'views/comment/form',
  'text!templates/comment/list.html',
  'views/alert',
  ], function($, _, Backbone, CommentModel, CommentItemView, CommentFormView, listTemplate, AlertView) {

  var CommentListView = Backbone.View.extend({

    listTemplate : _.template(listTemplate),

    events: {
      'click .new' : 'new',
    },

    initialize: function(options) {
      _.bindAll(this, 'render','renderItem','close');

      this.vent = options.vent;
      this.vent.on('publication:new' , this.new);

      this.collection.on('reset', this.render);
      this.collection.on('sync',  this.render);
      this.collection.on('error', this.error);
    },

    render: function() {
      this.$el.html(this.listTemplate());
      this.collection.each(this.renderItem);

      this.delegateEvents();
      return this;
    },

    renderItem: function(model){
      var itemView = new CommentItemView({model:model, vent:this.vent});
      this.$('ul').append(itemView.render().el);
    },
    
    new: function(event) {
      if (event) event.preventDefault();

      var formView = new CommentFormView({
        model : new PublicationModel, 
        vent  : this.vent,
      });
                    
      Backbone.history.navigate('comment/new');
    },

    error: function(model, response) {
      var alertView = new AlertView({msg: response.responseText, type: 'error'});
      $('.head').html(alertView.render().el); 
    },

    close: function() {
      this.undelegateEvents();
      this.remove();
    },

  });

  return CommentListView;
});
