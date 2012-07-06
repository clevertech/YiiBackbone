define([
  'jquery',
  'underscore',
  'backbone',
  'collections/user',
  'views/user/list',
  'app',
  'text!templates/navbar/dropdown.html'
  ], function($, _, Backbone, UserCollection, UserListView, App, template) {

  return Backbone.View.extend({
    template : _.template(template),
    events: {
      "click #logout"   : "logout"
    },

    initialize: function() {
      this.model.on('destroy', this.close, this);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      $('#nav-menu').html(this.el);
      return this;
    },

    logout: function(event) {
      event.preventDefault();
      App.vent.trigger('logout');
    },

    close: function() {
      this.undelegateEvents();
      this.remove();
    }
  });

});
