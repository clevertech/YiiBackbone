define([
  'jquery', 
  'underscore', 
  'backbone',
  'visualsearch',
  ], function($, _, Backbone) {

  var SearchView = Backbone.View.extend({

    initialize: function(options) {
      _.bindAll(this, 'render','search','valueMatches','facetMatches');

      this.vent = options.vent;

      this.posts = options.posts;
      this.comments = options.comments;

      // jQuerry deferred collection fetch 
      var self = this;
      $.when(this.posts.fetch())
       .then(function() {
          $.when(self.comments.fetch())
           .then(function() {
              var visualSearch = VS.init({
                container  : $('#search'),
                query      : '',
                unquotable : ['text'],
                callbacks  : {
                  search       : self.search,
                  valueMatches : self.valueMatches,
                  facetMatches : self.facetMatches,
                }
              });
            });
        });
    },

    search: function(query, searchCollection) {
      var self = this;
      searchCollection.each(function(item) {
        switch(item.get('category')) {
          case 'Post':
            var post = self.posts.find(function(model) {
              return model.get('title') == item.get('value');
            });
            self.vent.trigger('post:open', post);
            break;
        }
      });
    },

    valueMatches: function(category, searchTerm, callback) {
      switch (category) {
        case 'Post':
          callback(this.posts.pluck('title'));
          break;
        }
    },

    facetMatches: function(callback) {
      callback(['Post']);
    },

  });

  return SearchView;
});
