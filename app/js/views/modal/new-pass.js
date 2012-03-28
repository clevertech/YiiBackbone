define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/modal/new-pass.html',
  'bootstrapModal',
  ], function($, _, Backbone, modalTemplate) {

  var ModalNewPassView = Backbone.View.extend({
    
    id: "modal",

    modalTemplate: _.template(modalTemplate),

    events: {
      "click .confirm" : "confirmAction",
      "click .cancel"  : "cancelAction",
    },

    initialize: function(options) {
      _.bindAll(this, 'render');

      this.header = options.header;
    },

    render: function() {
      this.$el.html(this.modalTemplate({header: this.header}));

      this.delegateEvents();
      return this;
    },

    confirmAction: function(event) {
      event.preventDefault();
      $('#modal').modal('hide');
      this.close();
      this.model.trigger('modal:newpass');
    },

    cancelAction: function(event) {
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

  return ModalNewPassView;
});
