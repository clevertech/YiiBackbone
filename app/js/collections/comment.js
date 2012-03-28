define([
  'jquery',
  'underscore', 
  'backbone', 
  'models/comment'
  ], function($, _, Backbone, CommentModel){
	  
	var CommentCollection = Backbone.Collection.extend({

    model: CommentModel,

    url: 'api/comment',

    // For fetching a set you can adapt that
    // url: function(models) {
      // return 'api/publication/' + (models ? models.pluck('id').join(';') + '/' : '');
    // },
  
  });

  return CommentCollection;
});
