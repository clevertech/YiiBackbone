define([
  'jquery', 
  'underscore', 
  'backbone',
  'modelbinding',
  'models/post',
  'collections/comment',
  'text!templates/post/form.html',
  'views/alert',
  // 'bootstrapWysihtml5',
  ], function($, _, Backbone, ModelBinding, PostModel, CommentCollection, formTemplate, AlertView) {

  var PostFormView = Backbone.View.extend({

    formTemplate : _.template(formTemplate),

    events: {
      'click button[name=save]'   : 'save',
      'click button[name=cancel]' : 'cancel',
    },
    
    initialize: function(options) {
      _.bindAll(this, 'render','new','open','close','success','error');

      this.vent = options.vent;
      this.vent.on('post:new' , this.new);
      this.vent.on('post:open', this.open);

      this.model.on('sync', this.success);
      this.model.on('error', this.error);
    },

    render: function(){
      this.$el.html(this.formTemplate());
      $('.main').html(this.$el);

      ModelBinding.bind(this);
      this.delegateEvents();

      // $('#content').wysihtml5();

      return this;
    },

    save: function(event) {
      event.preventDefault();
      // if (this.model.isNew()) {
        // this.model.set('user_id', user);
      // }
      this.model.save();
    },

    cancel: function(event) {
      event.preventDefault();
      this.close();
      this.vent.trigger('post:list');
    },

    new: function() {
      this.render();
      Backbone.history.navigate('post/new');
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
      var msg = response.responseText ? response.responseText : response.statusText; 
      var alertView = new AlertView({msg:msg,type:'error'});
      $('.head').html(alertView.render().el); 
    },

    close: function() {
	  this.unbind();
      ModelBinding.unbind(this);
      this.model.off('sync', this.success);
      this.model.off('error', this.error);
      this.undelegateEvents();
      this.remove();
    },

  });

  return PostFormView;
});
