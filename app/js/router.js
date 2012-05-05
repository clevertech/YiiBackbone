define([
  'jquery',
  'underscore', 
  'backbone',
  ], function($, _, Backbone) {

  var Router = Backbone.Router.extend({

    routes: {
      ""                     : "home",
      "user/list"            : "userList",
      "user/new"             : "userNew",
      "user/edit/:id"        : "userEdit",
      "user/delete/:id"      : "userDelete",
      "post/list"            : "postList",
      "post/new"             : "postNew",
      "preset/:pwResetToken" : "resetPassword",
    },

    initialize: function(options) {
      _.bindAll(this, 'home','userList','userNew','resetPassword','postList','postNew');
      this.vent = options.vent;
    },

    home: function() {
      this.vent.trigger('post:list');
    },
  
    userList: function() {
      this.vent.trigger('user:list');
    },

    userNew: function() {
      this.vent.trigger('user:new');
    },

    resetPassword: function(pwResetToken) {
      this.vent.trigger('site:passreset', pwResetToken);
    },

    postList: function() {
      this.vent.trigger('post:list');
    },

    postNew: function() {
      this.vent.trigger('post:new');
    },

  });

  return Router;
});
