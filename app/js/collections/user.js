define([
  'jquery',
  'underscore', 
  'backbone', 
  'models/user'
  ], function($, _, Backbone, User){
	  
	var UserCollection = Backbone.Collection.extend({

    model: User,
    url: 'api/user',

  });

  return UserCollection;
});
