/* global define */

define([
  'backbone',
  'models/todo-model',
  'backboneLocalstorage'
], function(Backbone, Todo) {
  'use strict';

  var TodoCollection = Backbone.Collection.extend({
    model: Todo,

    localStorage: new Backbone.LocalStorage('todos-backbone'),

    remaining: function() {
      return this.filter(function(todo) {
        return todo.get('completed') === false;
      });
    }
  });

  return TodoCollection;
});
