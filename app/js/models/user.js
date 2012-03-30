define([
  'jquery', 
  'underscore', 
  'backbone',
  'models/post',
  'models/comment',
  'collections/post',
  'collections/comment',
  'backboneRelational',
  ], function($, _, Backbone, PostModel, CommentModel, PostCollection, CommentCollection) {

  var UserModel = Backbone.RelationalModel.extend({

    urlRoot: 'api/user',

    relations: [
      {
        type: Backbone.HasMany, 
        key: 'posts',
        relatedModel: PostModel,
        collectionType: PostCollection, 
        reverseRelation: {
          key: 'author',
          keySource: 'user_id',
          includeInJSON: Backbone.Model.prototype.idAttribute,
        }
      },
      {
        type: Backbone.HasMany, 
        key: 'comments',
        relatedModel: CommentModel,
        collectionType: CommentCollection, 
        reverseRelation: {
          key: 'author',
          keySource: 'user_id',
          includeInJSON: Backbone.Model.prototype.idAttribute,
        }
      },
    ],



  });

  return UserModel;
});
