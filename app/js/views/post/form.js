define([
  'jquery',
  'underscore',
  'backbone',
  'modelbinding',
  'models/post',
  'collections/comment',
  'text!templates/post/form.html',
  'app'
  // 'bootstrapWysihtml5',
  ], function($, _, Backbone, ModelBinding, PostModel, CommentCollection, template, App) {

  return Backbone.View.extend({
    template : _.template(template),
    events: {
      'click button[name=save]'   : 'save',
      'click button[name=cancel]' : 'cancel'
    },

    initialize: function(options) {
      _.bindAll(this, 'render','close','success','error');
      this.model.on('sync', this.success);
      this.model.on('error', this.error);
    },

    render: function(){
      this.$el.html(this.template());
      ModelBinding.bind(this);
    },

    save: function(event) {
      event.preventDefault();
      App.posts.create(this.model, {wait: true});
    },

    cancel: function(event) {
      event.preventDefault();
      App.vent.trigger('post:list');
    },

    success: function(model, response) {
      App.vent.trigger('alert', {
        msg: 'Post "' + this.model.get('title') + '" updated.',
        type: 'success'
      });
      App.vent.trigger('post:list');
    },

    error: function(model, response) {
      App.vent.trigger('alert', {
        msg: response.responseText ? response.responseText : response.statusText,
        type: 'error'
      });
    },

    close: function() {
      ModelBinding.unbind(this);
      this.model.off('sync', this.success);
      this.model.off('error', this.error);
      this.undelegateEvents();
      this.remove();
    }
  });
});
