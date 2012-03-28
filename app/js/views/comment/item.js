define([
  'jquery', 
  'underscore', 
  'backbone',
  'views/alert',
  'views/modal/confirm',
  'text!templates/comment/item.html',
  ], function($, _, Backbone, AlertView, ModalConfirmView, itemTemplate) {

  var CommentItemView = Backbone.View.extend({

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
      this.vent.trigger('publication:open', this.model);
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

  return CommentItemView;
});
