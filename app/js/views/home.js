define([
  'jquery', 
  'underscore', 
  'backbone',
  ], function($, _, Backbone) {

  var HomeView = Backbone.View.extend({

    // template: _.template(),

    events: {

    },

    initialize: function(options) {
      _.bindAll(this, 'render');
      this.vent = options.vent;
    },

    render: function() {

    },

    close: function() {
      this.remove();
      this.undelegateEvents();
    },

  });

  return HomeView;
});
