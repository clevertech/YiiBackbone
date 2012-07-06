define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'views/modal/forgot-pass',
  'views/modal/new-pass',
  'text!templates/navbar/login.html'
  ], function($, _, Backbone, App, ModalForgotPassView, ModalNewPassView, template) {

  return Backbone.View.extend({
    template : _.template(template),
    events: {
      "click #forgot-pass"       : "forgotPass"
    },

    initialize: function() {
      _.bindAll(this, 'render','sendReset','newPassword','resetPassword','close','error');

      App.vent.on('site:passreset', this.newPassword);

      this.model.on('change:authenticated', this.checkAuth, this);
      this.model.on('error', this.error, this);
      this.model.on('modal:forgotpass', this.sendReset, this);
      this.model.on('modal:newpass', this.resetPassword, this);
    },

    render: function() {
      this.$el.html(this.template());
      var model = this.model;
      var view = this;
      this.$('form').on('submit', function() {
        model.set({
          username: view.$("input[name=username]").val(),
          password: view.$("input[name=password]").val()
        });
        $.ajax({
          type: 'POST',
          url: model.url,
          dataType: 'json',
          contentType:'application/json',
          data: JSON.stringify(_.extend(model.toJSON(), {ajax: 'login-form'})),
          success: function(data) {
            if (data) {
              var error = '';
              _.each(data, function(element) {
                error += '<li>' + element + '</li>';
              });
              error = '<ul>' + error + '</ul>';
              App.vent.trigger('alert', {
                msg: error,
                type: 'error'
              });
            } else {
              model.save(null, {
                success: function() {
                  model.trigger('login');
                }
              });
            }
          }
        });
        return false;
      });
      $('.login').html(this.el);
    },

    // Password reset functions:
    forgotPass: function(event) {
      event.preventDefault();
      alert('In progress');
//      this.modalForgotPassView = new ModalForgotPassView({model:this.model, header: "Password Reset"});
//      $('.head').html(this.modalForgotPassView.render().el);
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

    error: function(model, response) {
      App.vent.trigger('alert', {
        msg: response.responseText,
        type: 'error'
      });
    },

    close: function() {
      this.undelegateEvents();
      this.off(null, null, this);
      this.remove();
    }
  });

});
