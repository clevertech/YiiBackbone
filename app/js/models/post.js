define([
  'jquery',
  'underscore',
  'backbone',
  'models/comment',
  'collections/comment',
  'backboneRelational',
  'datejs'
  ], function($, _, Backbone, CommentModel, CommentCollection) {

  return Backbone.RelationalModel.extend({

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
      }
    ],

    fetchRelated: function( key, options ) {
      if('comments' == key && !this.get('comments').length) {
        var self = this;
        return [$.ajax({
          url: 'post/comments/id/' + this.id,
          success: function(data) {
            self.get('comments').reset(data);
          }
        })];
      }
      return Backbone.RelationalModel.prototype.fetchRelated.call( this, key, options );
    }

  });
});
