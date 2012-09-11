define([
  'jquery',
  'underscore',
  'backbone',
  'views/user/item',
  'views/user/form',
  'text!templates/user/list.html',
  'app'
  ], function($, _, Backbone, UserItemView, UserFormView, template, App) {

  return Backbone.View.extend({
    template : _.template(template),

    initialize: function(options) {
      _.bindAll(this, 'render','renderItem','close');
      this.collection.on('error', this.error);
    },

    render: function() {
      this.$el.html(this.template());
      this.collection.each(this.renderItem);
    },

    renderItem: function(model){
      var itemView = new UserItemView({model:model});
      itemView.render();
      this.$('tbody').append(itemView.el);
    },

    error: function(model, response) {
      App.vent.trigger('alert', {
        msg: response.responseText ? response.responseText : response.statusText,
        type: 'error'
      });
    },

    close: function() {
      this.undelegateEvents();
      this.remove();
    }

  });
});
