define([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'visualsearch'
  ], function($, _, Backbone, App) {

  return Backbone.View.extend({

    initialize: function(options) {
      _.bindAll(this, 'render','search','valueMatches','facetMatches');

      this.vent = options.vent;

      this.posts = options.posts;
      this.comments = options.comments;

      var visualSearch = VS.init({
        container  : this.$el,
        query      : '',
        unquotable : ['text'],
        callbacks  : {
          search       : this.search,
          valueMatches : this.valueMatches,
          facetMatches : this.facetMatches
        }
      });
      $('#search-container').html(this.el);
    },

    search: function(query, searchCollection) {
      searchCollection.each(function(item) {
        switch(item.get('category')) {
          case 'Post':
            var post = App.posts.find(function(model) {
              return model.get('title') == item.get('value');
            });
            Backbone.history.navigate('post/read/' + post.id, true);
            break;
        }
      });
    },

    valueMatches: function(category, searchTerm, callback) {
      switch (category) {
        case 'Post':
          this.loadPosts();
          callback(App.posts.pluck('title'));
          break;
        }
    },

    facetMatches: function(callback) {
      callback(['Post']);
    },

    loadPosts: _.once(function() {
      if (!App.posts.length) App.posts.fetch();
    })
  });

});
