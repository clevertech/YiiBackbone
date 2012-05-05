define([
  'jquery', 
  'underscore', 
  'backbone',
  'modelbinding',
  'text!templates/user/form.html',
  'views/alert',
  ], function($, _, Backbone, ModelBinding, formTemplate, AlertView) {

  var UserFormView = Backbone.View.extend({

    formTemplate : _.template(formTemplate),

    events: {
      'click button[name=save]'   : 'save',
      'click button[name=cancel]' : 'cancel',
    },

    initialize: function(options) {
      _.bindAll(this, 'render','success','close');

      this.vent = options.vent;
      this.model.on('error', this.error);
      this.model.on('sync', this.success);
    },

    render: function() {
      this.$el.html(this.formTemplate());

      ModelBinding.bind(this);
      this.delegateEvents();

      return this;
    },

    save: function(event) {
      event.preventDefault();
      this.model.save();
    },

    cancel: function(event) {
      event.preventDefault();

      this.close();
      this.vent.trigger('user:list');
    },

    success: function() {
      var alertView = new AlertView({
        msg: 'User "' + this.model.get('username') + '" updated.',
        type: 'success',
      });
      $('.head').html(alertView.render().el); 

      this.close();
      this.vent.trigger('user:list');
    },

    error: function(model, response) {
      var alertView = new AlertView({msg: response.responseText, type: 'error'});
      $('.head').html(alertView.render().el); 
    },

    close: function() {
      ModelBinding.unbind(this);
      this.model.off('error', this.error);
      this.model.off('sync', this.success);
      this.undelegateEvents();
      this.remove();
    },

  });

  return UserFormView;
});
