/* global define */

define([
  'jquery',
  'backbone',
  'views/app-view',
  'collections/todo-collection'
], function($, Backbone, AppView, TodoCollection) {
  'use strict';

  var TodoApp = Backbone.Router.extend({
    initialize: function() {
      this.todos = new TodoCollection();

      this.view = new AppView({collection: this.todos});
      this.view.render();
      $('body').prepend(this.view.el);
    },

    start: function() {
      this.todos.fetch();
    }
  });

  return TodoApp;
});