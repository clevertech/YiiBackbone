define([
  'jquery',
  'underscore', 
  'backbone', 
  'models/user'
  ], function($, _, Backbone, UserModel){
	  
	var UserCollection = Backbone.Collection.extend({

    model: UserModel,
    url: 'api/user',

  });

  return UserCollection;
});
