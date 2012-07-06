define([
  'jquery',
  'underscore',
  'backbone',
  'app'
  ], function($, _, Backbone, App) {

  return Backbone.Router.extend({

    routes: {
      ""                     : "postList",
      "user/list"            : "userList",
      "user/new"             : "userNew",
      "user/edit/:id"        : "userEdit",
      "user/delete/:id"      : "userDelete",
      "post/list"            : "postList",
      "post/new"             : "postNew",
      "post/edit/:id"        : "postEdit",
      "post/read/:id"        : "postRead",
      "preset/:pwResetToken" : "resetPassword"
    },

    resetPassword: function(pwResetToken) {
      App.vent.trigger('site:passreset', pwResetToken);
    },

    // Users
    userList: function() {
      App.vent.trigger('user:list');
    },

    userNew: function() {
      App.vent.trigger('user:new');
    },

    userEdit: function(id) {
      App.vent.trigger('user:edit', null, {id: id});
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
