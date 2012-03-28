define([
  'jquery', 
  'underscore', 
  'backbone',
  'backboneRelational',
  ], function($, _, Backbone) {

  var CommentModel = Backbone.RelationalModel.extend({
    
    urlRoot: 'api/comment',

  });

  return CommentModel;
});
