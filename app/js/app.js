define([
  'jquery',
  'underscore',
  'backbone',
  'marionette'
], function($, _, Backbone, Marionette) {

  var App = new Backbone.Marionette.Application;
  App.addRegions({
    mainRegion: '.main',
    headRegion: '.head'
  });
  return App;
});
