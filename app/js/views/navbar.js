define([
  'jquery', 
  'underscore', 
  'backbone',
  'collections/user',
  'views/user/list',
  'views/alert',
  'text!templates/navbar/dropdown.html',
  ], function($, _, Backbone, UserCollection, UserListView, AlertView, dropdownTemplate) {

  var NavbarView = Backbone.View.extend({

    el: ".navbar",

    dropdownTemplate : _.template(dropdownTemplate),

    events: {
      "click .brand"    : "home",
      "click #logout"   : "logout",
      "click #userlist" : "userList",
      "click #postList" : "postList",
    },

    initialize: function(options) {
      _.bindAll(this, 'render','home','logout','userList','close');

      this.vent = options.vent;
      this.vent.on('user:navbar', this.render);
    },

    render: function(model) {
      this.$('.nav').html(this.dropdownTemplate(model.toJSON()));
      return this;
    },

    home: function(event) {
      if (event !== undefined) event.preventDefault();
      Backbone.history.navigate("");
    },

    logout: function(event) {
      event.preventDefault();
      this.vent.trigger('site:logout');
    },

    userList: function(event) {
      event.preventDefault();
      this.vent.trigger('user:list');
    },

    postList: function(event) {
      event.preventDefault();
      this.vent.trigger('post:list');
    },

    close: function() {
      this.undelegateEvents();
      this.remove();
    },

  });

  return NavbarView;
});
