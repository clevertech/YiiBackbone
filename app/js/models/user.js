define([
  'jquery', 
  'underscore', 
  'backbone',
  ], function($, _, Backbone) {

  var UserModel = Backbone.Model.extend({

    urlRoot: 'api/user',

  });

  return UserModel;
});
