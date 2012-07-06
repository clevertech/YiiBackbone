define([
  'jquery',
  'underscore',
  'backbone',
  'modelbinding',
  'views/user/form',
  'text!templates/user/item.html',
  'app',
  'views/modal/confirm'
  ], function($, _, Backbone, ModelBinding, UserFormView, template, App, ModalConfirmView) {

  return Backbone.View.extend({

    tagName: 'tr',

    template : _.template(template),

    events: {
      'click a.edit'   : 'edit',
      'click a.delete' : 'delete'
    },

    initialize: function(options) {
      _.bindAll(this, 'render','confirmDelete');

      this.model.on('error', this.error);
      this.model.on('modal:confirm', this.confirmDelete);
    },

    render: function(template) {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    edit: function(event){
      event.preventDefault();
      App.vent.trigger('user:edit', this.model);
    },

    delete: function(event) {
      event.preventDefault();

      var modalConfirmView = new ModalConfirmView({
        model  : this.model,
        header : 'Confirm Delete',
        body   : 'Are you sure you want to delete this item?'
      });
      $('.head').html(modalConfirmView.render().el);
    },

    confirmDelete: function() {
      $.when(this.model.destroy()).done(this.close());
    },

    error: function(model, response) {
      App.vent.trigger('alert', {
        msg: response.responseText ? response.responseText : response.statusText,
        type: 'error'
      });
    },

    close: function() {
      this.model.off('error', this.error);
      this.model.off('modal:confirm', this.confirmDelete);
      this.undelegateEvents();
      this.remove();
    }

  });
});
