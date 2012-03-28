define([
  'jquery', 
  'underscore', 
  'backbone',
  'modelbinding',
  'views/user/form',
  'text!templates/user/item.html',
  'views/alert',
  'views/modal/confirm',
  ], function($, _, Backbone, ModelBinding, UserFormView, itemTemplate, AlertView, ModalConfirmView) {

  var UserItemView = Backbone.View.extend({

    tagName: 'tr',

    itemTemplate : _.template(itemTemplate),

    events: {
      'click a.edit'   : 'edit',
      'click a.delete' : 'delete',
    },
    
    initialize: function(options) {
      _.bindAll(this, 'render','confirmDelete');

      this.app = options.app;
      this.model.on('error', this.error);
      this.model.on('modal:confirm', this.confirmDelete);
    },

    render: function(template) {
      this.$el.html(this.itemTemplate(this.model.toJSON()));
      return this;
    },

    edit: function(event){
      event.preventDefault();

      var formView = new UserFormView({model:this.model, app:this.app});
      $('.main').html(formView.render().el);

      Backbone.history.navigate('user/edit/'+this.model.get('id'));
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

  return UserItemView;
});
