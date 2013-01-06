define([
  'jquery',
  'underscore',
  'backbone',
  'modelbinding',
  'app',
  'views/modal/confirm',
  'text!templates/post/item.html',
  'jqueryUIDatepicker'
  ], function($, _, Backbone, ModelBinding, App, ModalConfirmView, template) {

  return Backbone.View.extend({
    template : _.template(template),
    events: {
      'click a.delete' : 'delete',
      'click a.read'   : 'read',
      'click a.edit'   : 'edit'
    },

    initialize: function(options) {
      _.bindAll(this, 'render','confirmDelete', 'close');

      this.model.on('error', this.error);
      this.model.on('modal:confirm', this.confirmDelete);

      $.when(this.model.fetchRelated('comments'))
       .done(this.render);
    },

    render: function(template) {
      var self = this;
      $.when.apply(null, this.model.fetchRelated('comments')).done(function() {
        self.$el.html(self.template({
          model    : self.model.toJSON(),
          author   : self.model.get('author') ? self.model.get('author').toJSON() : '',
          comments : self.model.get('comments')
        }));
      });
      return this;
    },

    read: function(event){
      event.preventDefault();
      App.vent.trigger('post:read', this.model);
    },

    edit: function(event){
      event.preventDefault();
      App.vent.trigger('post:edit', this.model);
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
      $.when(this.model.destroy()).done(this.close);
    },

    error: function(model, response) {
      App.vent.trigger('alert', {
        msg: response.responseText ? response.responseText : response.statusText,
        type: 'error'
      });
    },

    close: function() {
      this.model.off('error', this.error);
      this.model.off('modal:confirm', this.confirmDelete);
      this.undelegateEvents();
      this.remove();
    }
  });
});
