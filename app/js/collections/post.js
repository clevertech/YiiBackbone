define([
  'jquery',
  'underscore',
  'backbone',
  'models/post',
  'datejs'
  ], function($, _, Backbone, PostModel){

	var PostCollection = Backbone.Collection.extend({

    model: PostModel,
    url: 'api/post',

    comparator: function(model) {
      var date = Date.parse(model.get('create_date'));
      return -date.getTime();
    }

  });

  return PostCollection;
});
