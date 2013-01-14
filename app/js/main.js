// Define jQuery as AMD module
define.amd.jQuery = true;

define([
  'jquery',
  'underscore',
  'backbone',
  'domReady',
  'router',
  'app',
  'models/login',
  'models/webUser',
  'collections/user',
  'collections/post',
  'collections/comment',
  'views/navbar',
  'views/search',
  'views/login',
  'bootstrapDropdown',
  'bootstrapModal',
  'backboneRelational',
  'datejs'
], function($, _, Backbone, domReady,
            Router, App,
            LoginModel, WebUser,
            UserCollection, PostCollection, CommentCollection,
            NavbarView, SearchView, LoginView) {

  $.ajaxSetup({
    dataFilter: function(data, dataType) {
      if ('Login Required!' === data) {
        App.vent.trigger('alert', {
          msg: 'Login Required',
          type: 'error'
        });
        // Return something not json parsable to
        // stop event triggering and all current ajax requests.
        // Looking for better solution.
        return ';';
      }
      return data;
    }
  });

  // Initialize search
  App.addInitializer(function (options) {
    var searchView = new SearchView({});
    searchView.render();
  });

  // Cross app collections
  App.users    = new UserCollection;
  App.posts    = new PostCollection;
  App.comments = new CommentCollection;

  // Web User
  App.vent.on('webUser:init', function(data) {
    $('body').removeClass('guest').addClass('logged-in');

    var model = data instanceof WebUser ? data : new WebUser(data);
    var view = new NavbarView({model: model});
    view.render();

    model.on('destroy',function() {
      view.close();
      App.vent.trigger('webUser:guest');
      App.vent.trigger('post:list');
    });
    this.vent.on('logout', model.destroy, model);
  }, App);

  App.vent.on('webUser:guest', function() {
    $('body').removeClass('logged-in').addClass('guest');
    var view = new LoginView();
    view.render();
    $('.login').html(view.el);
  }, App);

  // Alerts

  App.vent.on('alert', function (options) {
    require(['views/alert'], function(AlertView) {
      var alertView = new AlertView(options);
      App.headRegion.show(alertView);
    });
  });

  // Posts

  App.vent.on('post:list', function () {
    $.when(
      this.posts.length || this.posts.fetch()
    ).done(function() {
        require(['views/post/list'], function(PostList) {
          Backbone.history.navigate('post/list');
          var view = new PostList({
            collection : App.posts
          });
          App.mainRegion.show(view);
        })
      });
  }, App);

  App.vent.on('post:new', function () {
    Backbone.history.navigate('post/new');
    App.vent.trigger('post:form', new App.posts.model);
  }, App);

  App.vent.on('post:edit', function (model, options) {
    $.when(function () {
      if (!model) {
        model = new App.posts.model(options);
        return model.fetch();
      }
      return model;
    }()).then(function () {
      Backbone.history.navigate('post/edit/' + model.get('id'));
      App.vent.trigger('post:form', model);
    });
  }, App);

  App.vent.on('post:form', function (model) {
    require(['views/post/form'], function(PostForm) {
      var view = new PostForm({model: model});
      App.mainRegion.show(view);
    });
  }, App);

  App.vent.on('post:read', function(model, options) {
    $.when(function () {
      if (!model) {
        model = new App.posts.model(options);
        return model.fetch();
      }
      return model;
    }()).then(function () {
      require(['views/post/item'], function(PostItem) {
        Backbone.history.navigate('post/read/' + model.get('id'));
        var view = new PostItem({model: model});
        App.mainRegion.show(view);
      })
    });

  }, App);

  // Load code defined on php side in main layout and start the Application.
  require(['onLoad'], function() {
    App.start();
    App.router = new Router();
    Backbone.history.start();
  });

});
