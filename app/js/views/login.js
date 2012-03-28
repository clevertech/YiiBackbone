define([
  'jquery', 
  'underscore', 
  'backbone',
  'collections/user',
  'views/user/list',
  'views/alert',
  'views/modal/forgot-pass',
  'views/modal/new-pass',
  'text!templates/navbar/login.html',
  ], function($, _, Backbone, UserCollection, UserListView, AlertView, ModalForgotPassView, ModalNewPassView, loginFormTemplate) {

  var LoginView = Backbone.View.extend({

    el: ".login",

    loginFormTemplate : _.template(loginFormTemplate),

    events: {
      "click button[name=login]" : "login",
      "click #forgot-pass"       : "forgotPass",
    },

    initialize: function(options) {
      _.bindAll(this, 'render','checkAuth','logout','sendReset','newPassword','resetPassword','close','error');

      this.vent = options.vent;
      this.vent.on('site:logout', this.logout);
      this.vent.on('site:passreset', this.newPassword);

      this.model.on('change:authenticated', this.checkAuth);
      this.model.on('error', this.error);
      this.model.on('modal:forgotpass', this.sendReset);
      this.model.on('modal:newpass', this.resetPassword);
    },

    render: function() {
      this.$el.html(this.loginFormTemplate());
      return this;
    },

    checkAuth: function(model,value) {
      if (value) { 
        this.$el.html('');
        this.vent.trigger('user:navbar', model);
      } 
      else this.render();
    },

    login: function(event) {
      event.preventDefault();
      this.model.url = "api/site/login"; 
      this.model.save({
        username: this.$("input[name=username]").val(),
        password: this.$("input[name=password]").val()
      });
    },

    logout: function() {
      this.model.url = "api/site/logout"; 
      this.model.save({
        username : this.model.get('username'),
        token    : this.model.get('token'),
      });
      
      // TODO refactor, append() or html() in render() maybe 
      // Clean DOM 
      $('#search').html('');
      $('.nav').html('');
      $('.main').html('');
    },

    // Password reset functions:
    forgotPass: function(event) {
      event.preventDefault();
      this.modalForgotPassView = new ModalForgotPassView({model:this.model, header: "Password Reset"});
      $('.head').html(this.modalForgotPassView.render().el); 
    },

    sendReset: function() {
      this.model.url = "api/site/forgotpass"; 
      this.model.save({
        username: this.modalForgotPassView.$("input[name=username]").val()
      });
    },

    newPassword: function(pwResetToken) {
      this.pwResetToken = pwResetToken;
      this.modalNewPassView = new ModalNewPassView({model:this.model, header: "New Password"});
      $('.head').html(this.modalNewPassView.render().el); 
      $('#modal').modal();
    },

    resetPassword: function() {
      this.model.url = "api/site/passreset"; 
      this.model.save({
        password: this.modalNewPassView.$("input[name=password]").val(),
        pw_reset_token: this.pwResetToken
      });
    },

    close: function() {
      this.undelegateEvents();
      this.remove();
    },

    error: function(model, response) {
      var alertView = new AlertView({msg: response.responseText, type: "error"});
      $('.head').html(alertView.render().el); 
    },

  });

  return LoginView;
});
