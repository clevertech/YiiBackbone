define([
  'jquery',
  'underscore',
  'backbone',
  'models/comment'
  ], function($, _, Backbone, CommentModel){

  var CommentCollection = Backbone.Collection.extend({
    model: CommentModel,
    url: 'api/comment'
  });
  return CommentCollection;
});
