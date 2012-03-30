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
      _.bindAll(this,'initSearch','initViews','initRouter','initMisc','checkAuth');

      // declare main custom event object
      this.vent = _.extend({}, Backbone.Events);

      this.users    = new UserCollection;
      this.users.fetch();

      this.posts    = new PostCollection;
      this.comments = new CommentCollection;

      // Initialize login view 
      this.loginModel = new LoginModel;

      this.initViews();
      this.initRouter();
      this.initSearch();
      this.initMisc();
    },

    checkAuth: function() {
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

    initViews: function() {
      // Login view
      var loginView = new LoginView({model:this.loginModel, vent:this.vent});
          loginView.render();

      // Navbar view
      var navbarView = new NavbarView({vent:this.vent});

      // List views
      var userListView    = new UserListView({collection:this.users, vent:this.vent});
      var postListView = new PostListView({
        collection : this.posts,
        user       : this.loginModel,
        vent       : this.vent,
      });
      var commentListView = new CommentListView({collection:this.comments, vent:this.vent});

      // Form views
      var postFormView    = new PostFormView({
        model : new PostModel,
        user  : this.loginModel,
        vent  : this.vent,
      });
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
