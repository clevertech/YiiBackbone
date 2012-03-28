define([
  'jquery', 
  'underscore', 
  'backbone',
  'modelbinding',
  'collections/post',
  'views/alert',
  'text!templates/comment/form.html',
  'bootstrapTypeahead',
  ], function($, _, Backbone, ModelBinding, PostCollection, AlertView, formTemplate) {

  var CommentFormView = Backbone.View.extend({

    formTemplate : _.template(formTemplate),

    events: {
      'click button[name=save]'   : 'save',
      'click button[name=cancel]' : 'cancel',
      // 'click .inline-icon'        : 'editPublisher',
      // 'click .publisher_name'     : 'openPublisher',
    },
    
    initialize: function(options) {
      _.bindAll(this, 'render','success','close','open');

      this.vent = options.vent;
      this.vent.on('change:post', this.render);

      this.model.on('sync', this.success);
      this.model.on('error', this.error);
    },

    render: function() {
      var post = this.model.get('post');
      if (post)
        this.$el.html(this.formTemplate({post:post.toJSON()}));
      else
        this.$el.html(this.formTemplate({post:{}}));
      
      $('.main').html(this.$el);

      ModelBinding.bind(this);
      this.delegateEvents();

      return this;
    },

    save: function(event) {
      event.preventDefault();
      this.model.save();
    },

    cancel: function(event) {
      event.preventDefault();
      this.close();
      this.vent.trigger('publication:list');
    },

    open: function(model) {
      this.model = model;
      Backbone.history.navigate('comment/edit/' + model.get('id'));
    },

    success: function(model, response) {
      var alertView = new AlertView({
        msg: 'Comment "' + this.model.get('name') + '" updated.',
        type: 'success',
      });
      $('.head').html(alertView.render().el); 
        
      this.close();
      this.vent.trigger('comment:list');
    },

    error: function(model, response) {
      var alertView = new AlertView({msg: response.responseText, type: 'error'});
      $('.head').html(alertView.render().el); 
    },

    close: function() {
      ModelBinding.unbind(this);
      this.model.off('sync', this.success);
      this.model.off('error', this.error);
      this.undelegateEvents();
      this.remove();
    },

  });

  return CommentFormView;
});
