/* global define */

define([
  'jquery',
  'backbone',
  'views/app-view',
  'collections/todo-collection'
], function($, Backbone, AppView, TodoCollection) {
  'use strict';

  var TodoApp = Backbone.Router.extend({
    initialize:function() {
      var todos = new TodoCollection();

      this.view = new AppView({collection: todos});
      this.view.render();
      $('body').prepend(this.view.el);
    }
  });

  return TodoApp;
});