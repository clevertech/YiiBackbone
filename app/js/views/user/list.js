define([
  'jquery', 
  'underscore', 
  'backbone',
  'modelbinding',
  'models/user',
  'views/user/item',
  'views/user/form',
  'text!templates/user/list.html',
  'views/alert',
  ], function($, _, Backbone, ModelBinding, UserModel, UserItemView, UserFormView, listTemplate, AlertView) {

  var UserListView = Backbone.View.extend({

    listTemplate : _.template(listTemplate),

    events: {
      'click .new' : 'new',
    },

    initialize: function(options) {
      _.bindAll(this, 'render','renderItem','list','close');

      this.vent = options.vent;
      this.vent.on('user:list', this.list);
      this.vent.on('user:new', this.new);

      this.collection.on('reset', this.render);
      this.collection.on('sync', this.render);
      this.collection.on('error', this.error);
    },

    render: function() {
      this.$el.html(this.listTemplate());
      this.collection.each(this.renderItem);

      this.delegateEvents();
      return this;
    },

    renderItem: function(model){
      var itemView = new UserItemView({model:model, vent:this.vent});
      this.$('tbody').append(itemView.render().el);
    },
    
    list: function() {
      $('.main').html(this.el);
      this.collection.fetch();
      Backbone.history.navigate('user/list');
    },

    new: function(event) {
      if (event) event.preventDefault();

      var formView = new UserFormView({model: new UserModel, vent:this.vent});
      $('.main').html(formView.render().el);

      Backbone.history.navigate('user/new');
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

  return UserListView;
});
