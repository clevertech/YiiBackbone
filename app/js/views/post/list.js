define([
  'jquery', 
  'underscore', 
  'backbone',
  'views/post/item',
  'text!templates/post/list.html',
  'views/alert',
  ], function($, _, Backbone, PostItemView, listTemplate, AlertView) {

  var PostListView = Backbone.View.extend({

    listTemplate : _.template(listTemplate),

    events: {
      'click .new' : 'new',
    },

    initialize: function(options) {
      _.bindAll(this, 'render','renderItem','list','close');

      this.user = options.user;

      this.vent = options.vent;
      this.vent.on('post:list', this.list);

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

    renderItem: function(model) {
      var itemView = new PostItemView({model:model, vent:this.vent});
      this.$('ul').append(itemView.el);
    },
    
    list: function() {
      $('.main').html(this.el);
      this.collection.fetch();
      Backbone.history.navigate('post/list');
    },

    new: function(event) {
      event.preventDefault();
      this.vent.trigger('post:new');
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

  return PostListView;
});
