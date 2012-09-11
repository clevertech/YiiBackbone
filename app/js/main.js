// Use ECMAScript 5 Strict Mode
"use strict";

// Define jQuery as AMD module
define.amd.jQuery = true;

// Require.js allows us to configure mappings to paths
// as demonstrated below:
// TODO: Load minified version of the libs or use Require.js's JS compiler (R)
requirejs.config({
  paths: {
    jquery               : 'libs/jquery/jquery-1.7.1.min',
    jqueryUICore         : 'libs/jquery-ui/jquery.ui.core',
    jqueryUIWidget       : 'libs/jquery-ui/jquery.ui.widget',
    jqueryUIMouse        : 'libs/jquery-ui/jquery.ui.mouse',
    jqueryUIPosition     : 'libs/jquery-ui/jquery.ui.position',
    jqueryUIAutocomplete : 'libs/jquery-ui/jquery.ui.autocomplete',
    jqueryUIDatepicker   : 'libs/jquery-ui/jquery.ui.datepicker',
    cookie               : 'libs/jquery/jquery.cookie',
    underscore           : 'libs/underscore/underscore',
    underscoreString     : 'libs/underscore/underscore.string',
    backbone             : 'libs/backbone/backbone',
    backboneRelational   : 'libs/backbone/backbone-relational',
    modelbinding         : 'libs/backbone/backbone.modelbinding',
    visualsearch         : 'libs/app/visualsearch',
    marionette           : 'libs/backbone/backbone.marionette',
    text                 : 'libs/require/text',
    domReady             : 'libs/require/domReady',
    json                 : 'libs/utils/json2',
    bootstrapAlert       : 'libs/bootstrap/bootstrap-alert',
    bootstrapButton      : 'libs/bootstrap/bootstrap-button',
    bootstrapDropdown    : 'libs/bootstrap/bootstrap-dropdown',
    bootstrapModal       : 'libs/bootstrap/bootstrap-modal',
    bootstrapTab         : 'libs/bootstrap/bootstrap-tab',
    bootstrapTypeahead   : 'libs/bootstrap/bootstrap-typeahead',
    // bootstrapWysihtml5   : 'libs/bootstrap/bootstrap-wysihtml5',
    datejs: 'libs/utils/date'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    visualsearch: {
      deps: ['backbone', 'jqueryUIAutocomplete']
    },
    marionette: {
      deps: ['backbone']
    }
  }
});

define([
  'jquery',
  'underscore',
  'backbone',
  'domReady',
  'router',
  'app',
  'models/login',
  'models/post',
  'models/comment',
  'models/webUser',
  'collections/user',
  'collections/post',
  'collections/comment',
  'views/home',
  'views/navbar',
  'views/search',
  'views/login',
  'views/user/list',
  'views/post/list',
  'views/comment/list',
  'views/post/form',
  'views/comment/form',
  'views/user/form',
  'views/post/form',
  'views/alert',
  'models/user',
  'views/post/item',
  'cookie',
  'bootstrapDropdown',
  'bootstrapModal',
  'backboneRelational',
  'datejs'
], function($, _, Backbone, domReady,
            Router, App,
            LoginModel, PostModel, CommentModel, WebUser,
            UserCollection, PostCollection, CommentCollection,
            HomeView, NavbarView, SearchView, LoginView,
            UserListView, PostListView, CommentListView,
            PostFormView, CommentFormView, UserForm, PostForm, AlertView,
            UserModel, PostItem) {

  $.ajaxSetup({
    dataFilter: function(data, dataType) {
      if ('Login Required!' === data) {
        App.vent.trigger('alert', {
          msg: 'Login Required',
          type: 'error'
        });
        // Return something not json parsable to
        // stop event triggering and ajax loading.
        // Looking for better solution.
        return ';';
      }
      return data;
    }
  });

  // Initialize Router
  App.addInitializer(function (options) {
    this.router = new Router();
    Backbone.history.start();
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
    var model = new WebUser;
    var view = new LoginView({model: model});
    view.render();
    model.on('login', function() {
      view.close();
      App.vent.trigger('webUser:init', this);
    }, model);
  }, App);

  // Alerts

  App.vent.on('alert', function (options) {
    var alertView = new AlertView(options);
    this.headRegion.show(alertView);
  }, App);

  // Users

  App.vent.on('user:list', function () {
    $.when(
      this.users.length || this.users.fetch()
    ).done(function() {
        Backbone.history.navigate('user/list');
        var view = new UserListView({
          collection: App.users
        });
        App.mainRegion.show(view);
      });
  }, App);

  App.vent.on('user:new', function() {
    Backbone.history.navigate('user/new');
    var view = new UserForm({
        model: new this.users.model
    });
    App.mainRegion.show(view);
  }, App);

  App.vent.on('user:new', function () {
    Backbone.history.navigate('user/new');
    App.vent.trigger('user:form', new UserModel);
  }, App);

  App.vent.on('user:edit', function (model, options) {
    $.when(function () {
      if (!model) {
        model = new this.users.model(options);
        return model.fetch();
      }
      return model;
    }()).then(function () {
        Backbone.history.navigate('user/edit/' + model.get('id'));
        App.vent.trigger('user:form', model);
      });
  }, App);

  App.vent.on('user:form', function (model) {
    $.when(
//      fetch some data needed for view
    ).done(function () {
        var view = new UserForm({model: model});
        App.mainRegion.show(view);
      });
  }, App);

  // Posts

  App.vent.on('post:list', function () {
    $.when(
      this.posts.length || this.posts.fetch()
    ).done(function() {
        Backbone.history.navigate('post/list');
        var view = new PostListView({
          collection : App.posts
        });
        App.mainRegion.show(view);
      });
  }, App);

  App.vent.on('post:new', function () {
    Backbone.history.navigate('post/new');
    App.vent.trigger('post:form', new this.posts.model);
  }, App);

  App.vent.on('post:edit', function (model, options) {
    $.when(function () {
      if (!model) {
        model = new PostModel(options);
        return model.fetch();
      }
      return model;
    }()).then(function () {
      Backbone.history.navigate('post/edit/' + model.get('id'));
      App.vent.trigger('post:form', model);
    });
  }, App);

  App.vent.on('post:form', function (model) {
    console.log('post form');
    $.when(
//      fetch some data needed for view
    ).done(function () {
        var view = new PostForm({model: model});
        App.mainRegion.show(view);
      });
  }, App);

  App.vent.on('post:read', function(model, options) {
    $.when(function () {
      if (!model) {
        model = new PostModel(options);
        return model.fetch();
      }
      return model;
    }()).then(function () {
      Backbone.history.navigate('post/read/' + model.get('id'));
      var view = new PostItem({model: model});
      App.mainRegion.show(view);
    });

  }, App);

  // Load code defined on php side in main layout and start the Application.
  require(['onLoad']);
  App.start();
});
