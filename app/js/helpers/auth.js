define([
  'jquery', 
  'underscore', 
  'backbone',
  ], function($, _, Backbone) {

  var Auth = function() {
    this.initialize.apply(this, arguments);
  };

  _.extend(Auth.prototype, {

    initialize: function() {
    },

    checkAuth: function() {
      var params = this.getCookieParams();
      if (params) {
        this.model.set('username', params.username);
        this.model.set('authenticated', true);
      }
    },

    getCookieParams: function() {
      if ($.cookie("_yiibackbone")) {
        var data = $.cookie("_yiibackbone").split(',');
        var params = {
          username: data[0],
          token: data[1],
        }
        return params;
      } else {
        return false; 
      }
    },

  });

  return Auth;
});
