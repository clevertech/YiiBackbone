define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/modal/confirm.html',
  ], function($, _, Backbone, modalTemplate) {

  var ModalConfirmView = Backbone.View.extend({
    
    id: "modal",

    modalTemplate: _.template(modalTemplate),

    events: {
      "click .confirm" : "confirm",
      "click .cancel"  : "cancel",
    },

    initialize: function(options) {
      _.bindAll(this, 'render');

      this.header = options.header;
      this.body = options.body; 
    },

    render: function() {
      this.$el.html(this.modalTemplate({header: this.header, body: this.body}));

      this.delegateEvents();
      return this;
    },

    confirm: function(event) {
      event.preventDefault();
      $('#modal').modal('hide');

      this.close();
      this.model.trigger('modal:confirm');
    },

    cancel: function(event) {
      event.preventDefault();
      $('#modal').modal('hide');

      this.close();
      this.model.trigger('modal:cancel');
    },

    close: function() {
      this.undelegateEvents();
      this.remove();
    },

  });

  return ModalConfirmView;
});
