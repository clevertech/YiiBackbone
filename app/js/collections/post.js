define([
  'jquery',
  'underscore',
  'backbone',
  'models/post',
  'datejs'
  ], function($, _, Backbone, PostModel){

  return Backbone.Collection.extend({
    model: PostModel,
    url: 'api/post',

    comparator: function(a, b) {
      return Date.parse(a.get('create_date')) < Date.parse(b.get('create_date'));
    }
  });
});
