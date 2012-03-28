define([
  'jquery', 
  'underscore', 
  'backbone',
  'models/comment',
  'collections/comment',
  'backboneRelational',
  ], function($, _, Backbone, CommentModel, CommentCollection) {

  var PostModel = Backbone.RelationalModel.extend({
    
    urlRoot: 'api/post',

    relations: [
      {
        type: Backbone.HasMany, 
        key: 'comments',
        relatedModel: CommentModel,
        collectionType: CommentCollection, 
        reverseRelation: {
          key: 'post',
          keySource: 'post_id',
          includeInJSON: Backbone.Model.prototype.idAttribute,
        }
      },
    ],

  });

  return PostModel;
});
