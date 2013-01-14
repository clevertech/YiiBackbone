define([
  'jquery',
  'underscore',
  'backbone',
  'app'
  ], function($, _, Backbone, App) {

  return Backbone.Router.extend({

    routes: {
      ".*"                   : "postList",
      "user/list"            : "userList",
      "user/new"             : "userNew",
      "user/edit/:id"        : "userEdit",
      "user/delete/:id"      : "userDelete",
      "post/list"            : "postList",
      "post/new"             : "postNew",
      "post/edit/:id"        : "postEdit",
      "post/read/:id"        : "postRead"
    },

    // Users
    userList: function() {
      $.when(
        App.users.length || App.users.fetch()
      ).done(function() {
        require(['views/user/list'], function(UserList) {
          App.mainRegion.show(new UserList({
            collection: App.users
          }));
        });
      });
    },

    userNew: function() {
      require(['views/user/form'], function(UserForm) {
        App.mainRegion.show(new UserForm({
          model: new App.users.model
        }));
      });
    },

    userEdit: function(id) {
      $.when(
        App.users.length || App.users.fetch()
      ).done(function () {
        require(['views/user/form'], function(UserForm) {
          var model = App.users.get(id);
          App.mainRegion.show(new UserForm({
            model: model
          }));
        });
      });
    },

    // Posts:
    postList: function() {
      App.vent.trigger('post:list');
    },

    postNew: function() {
      App.vent.trigger('post:new');
    },

    postEdit: function(id) {
      App.vent.trigger('post:edit', null, {id: id});
    },

    postRead: function(id) {
      App.vent.trigger('post:read', null, {id: id});
    }

  });
});
