define([
  'jquery', 
  'underscore', 
  'backbone',
  ], function($, _, Backbone) {

  var LoginModel = Backbone.Model.extend({
    
    defaults:{
      authenticated: false
    },

  });

  return LoginModel;
});

