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
      Backbone.history.navigate('post/list', true);
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

  // Load code defined on php side in main layout and start the Application.
  require(['onLoad'], function() {
    App.start();
    App.router = new Router();
    Backbone.history.start();
  });
});
