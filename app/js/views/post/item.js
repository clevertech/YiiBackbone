define([
  'jquery', 
  'underscore', 
  'backbone',
  'modelbinding',
  'views/alert',
  'views/modal/confirm',
  'text!templates/post/item.html',
  ], function($, _, Backbone, ModelBinding, AlertView, ModalConfirmView, itemTemplate) {

  var PostItemView = Backbone.View.extend({

    tagName: 'li',

    itemTemplate : _.template(itemTemplate),

    events: {
      'click a.edit'   : 'edit',
      'click a.delete' : 'delete',
    },
    
    initialize: function(options) {
      _.bindAll(this, 'render','confirmDelete');

      this.vent = options.vent;

      this.model.on('error', this.error);
      this.model.on('modal:confirm', this.confirmDelete);
    },

    render: function(template) {
      this.$el.html(this.itemTemplate(this.model.toJSON()));
      return this;
    },

    edit: function(event){
      event.preventDefault();
      this.vent.trigger('post:open', this.model);
    },

    delete: function(event) {
      event.preventDefault();

      var modalConfirmView = new ModalConfirmView({
        model  : this.model, 
        header : 'Confirm Delete', 
        body   : 'Are you sure you want to delete this item?'
      });
      $('.head').html(modalConfirmView.render().el); 
    },

    confirmDelete: function() {
      this.model.destroy();
      this.close();
    },

    error: function(model, response) {
      var alertView = new AlertView({msg: response.responseText, type: 'error'});
      $('.head').html(alertView.render().el); 
    },

    close: function() {
      this.model.off('error', this.error);
      this.model.off('modal:confirm', this.confirmDelete);
      this.undelegateEvents();
      this.remove();
    },

  });

  return PostItemView;
});
