define([
  'jquery', 
  'underscore', 
  'backbone',
  'modelbinding',
  'collections/comment',
  'text!templates/post/form.html',
  'views/alert',
  // 'bootstrapWysihtml5',
  ], function($, _, Backbone, ModelBinding, CommentCollection, formTemplate, AlertView) {

  var PostFormView = Backbone.View.extend({

    formTemplate : _.template(formTemplate),

    events: {
      'click button[name=save]'   : 'save',
      'click button[name=cancel]' : 'cancel',
    },
    
    initialize: function(options) {
      _.bindAll(this, 'render','success','close','open');

      this.vent = options.vent;
      this.vent.on('post:open', this.open);

      this.model.on('sync', this.success);
      this.model.on('error', this.error);
      
      $.when(this.model.fetchRelated('comments'))
       .done(this.render);
    },

    render: function(){
      var comments = this.model.get('comments');

      this.$el.html(this.formTemplate({comments: comments}));
      $('.main').html(this.$el);

      ModelBinding.bind(this);
      this.delegateEvents();

      // $('#content').wysihtml5();

      return this;
    },

    save: function(event) {
      event.preventDefault();
      this.model.save();
    },

    cancel: function(event) {
      event.preventDefault();
      this.close();
      this.vent.trigger('post:list');
    },

    open: function(model) {
      this.model = model;
      this.render();
      Backbone.history.navigate('post/edit/' + this.model.get('id'));
    },

    success: function(model, response) {
      var alertView = new AlertView({
        msg  : 'Post "' + this.model.get('title') + '" updated.',
        type : 'success',
      });
      $('.head').html(alertView.render().el); 
        
      this.close();
      this.vent.trigger('post:list');
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

  return PostFormView;
});
