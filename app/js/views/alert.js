define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/alert.html',
  'bootstrapAlert'
], function($, _, Backbone, template) {

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      "click .close" : "close"
    },

    initialize: function(options) {
      this.msg = options.msg;
      this.type = options.type;
      this.$el.alert();
    },

    render: function() {
      this.$el.html(this.template({msg: this.msg, type: this.type}));
    },

    close: function() {
      this.remove();
      this.undelegateEvents();
    },

    onShow: function() {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
  });
});
