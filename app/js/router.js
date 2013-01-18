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

    // Todo: do something if model wasn't found
    userEdit: function(id) {
      $.when(
        App.users.length || App.users.fetch()
      ).done(function () {
        require(['views/user/form'], function(Form) {
          var model = App.users.get(id);
          App.mainRegion.show(new Form({
            model: model
          }));
        });
      });
    },

    // Posts:
    postList: function() {
      $.when(
        App.posts.length || App.posts.fetch()
      ).done(function() {
        require(['views/post/list'], function(PostList) {
          App.mainRegion.show(new PostList({
            collection : App.posts
          }));
        })
      });
    },

    postNew: function() {
      require(['views/post/form'], function(PostForm) {
        App.mainRegion.show(new PostForm({
          model: new App.posts.model
        }));
      });
    },

    // Todo: do something if model wasn't found
    postEdit: function(id) {
      $.when(
        App.posts.length || App.posts.fetch()
      ).done(function () {
        require(['views/post/form'], function(Form) {
          var model = App.posts.get(id);
          App.mainRegion.show(new Form({
            model: model
          }));
        });
      });
    },

    // Todo: do something if model wasn't found
    postRead: function(id) {
      $.when(
        App.posts.length || App.posts.fetch()
      ).done(function () {
        require(['views/post/item'], function(Item) {
          var model = App.posts.get(id);
          App.mainRegion.show(new Item({
            model: model
          }));
        });
      });
    }
  });
});
