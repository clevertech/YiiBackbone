define([
  'jquery', 
  'underscore', 
  'backbone',
  'models/post',
  'views/post/item',
  'views/post/form',
  'text!templates/post/list.html',
  'views/alert',
  ], function($, _, Backbone, PostModel, PostItemView, PostFormView, listTemplate, AlertView) {

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
      this.vent.on('post:new' , this.new);

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
      if (event) event.preventDefault();
      var formView = new PostFormView({model: new PostModel, vent:this.vent});
      formView.render();
      Backbone.history.navigate('post/new');
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
