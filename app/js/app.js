define([
  'jquery',
  'underscore', 
  'backbone',
  'domReady',
  'router',
  'models/login',
  'models/post',
  'models/comment',
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
  'cookie',
  'bootstrapDropdown',
  'bootstrapModal',
  'backboneRelational',
  ], function($, _, Backbone, domReady,
    Router, 
    LoginModel, PostModel, CommentModel,
    UserCollection, PostCollection, CommentCollection,
    HomeView, NavbarView, SearchView, LoginView,
    UserListView, PostListView, CommentListView, 
    PostFormView, CommentFormView) {

  var App = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this, 'initLogin','initAuthenticated','initSearch','initListViews','initRouter','initMisc');

      // declare main custom event object
      this.vent = _.extend({}, Backbone.Events);

      this.users    = new UserCollection;
      this.posts    = new PostCollection;
      this.comments = new CommentCollection;

      this.initLogin();
      this.initRouter();
    },

    initAuthenticated: function(model,value) {
      if (value) {
        this.initFormViews();
        this.initListViews();
        this.initSearch();
        this.initMisc();
      }
    },

    initLogin: function() {
      // Initialize login view 
      var loginModel = new LoginModel;
      loginModel.on('change:authenticated', this.initAuthenticated);

      var loginView = new LoginView({model:loginModel, vent:this.vent});
      loginView.render();

      // Initialize navbar and main views 
      var navbarView = new NavbarView({vent:this.vent});

      // Check user authentication
      var params = this.getCookieParams();
      if (params) {
        loginModel.set('username', params.username);
        loginModel.set('token', params.token);
        loginModel.set('authenticated', true);
      } 
    },

    initSearch: function() {
      // Initialize main search 
      var self = this;
      domReady(function() {
        var searchView = new SearchView({
          posts    : self.posts,
          comments : self.comments,
          vent     : self.vent,
        }); 
      });
    },

    initListViews: function() {
      var userListView        = new UserListView({collection:this.users, app:this}); // change app to vent
      var postListView        = new PostListView({collection:this.posts, vent:this.vent });
      var commentListView     = new CommentListView({collection:this.comments, vent:this.vent});
    },

    initFormViews: function() {
      var postFormView    = new PostFormView({model: new PostModel, vent:this.vent});
      var commentFormView = new CommentFormView({model: new CommentModel, vent:this.vent});
    },

    initRelationalModels: function() {
      // you can put dummy model initialization to fix a flaw in relations (new Model());

    },

    initRouter: function() {
      // Initialize router
      this.router = new Router({vent:this.vent});
      Backbone.history.start();
    },

    initMisc: function() {
      // JS sugar for all dropdowns with this class
      $('.dropdown-toggle').dropdown();
    },

    getCookieParams: function() {
      if ($.cookie('_yiibackbone')) {
        var data = $.cookie('_yiibackbone').split(',');
        var params = {
          username: data[0],
          token: data[1],
        }
        return params;
      }
    },

  });

  return new App;
});
