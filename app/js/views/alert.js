define([
  'jquery', 
  'underscore', 
  'backbone',
  'text!templates/alert.html',
  'bootstrapAlert',
  ], function($, _, Backbone, alertTemplate) {

  var AlertView = Backbone.View.extend({

    className: "row",

    alertTemplate: _.template(alertTemplate),

    events: {
      "click .close" : "close",
    },
    initialize: function(options) {
      _.bindAll(this, 'render');

      this.msg = options.msg;
      this.type = options.type; 

      this.$el.alert();
    },

    render: function() {
      this.$el.html(this.alertTemplate({msg: this.msg, type: this.type}));
      return this;
    },

    close: function() {
      this.remove();
      this.undelegateEvents();
    },

  });

  return AlertView;
});
