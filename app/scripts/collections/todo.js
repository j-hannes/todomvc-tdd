/*global define*/

define([
  'underscore',
  'backbone',
  'models/todo'
], function (_, Backbone, TodoModel) {
  'use strict';

  var TodoCollection = Backbone.Collection.extend({
    model: TodoModel,

    addTodo: function(title) {
      this.add(new TodoModel({
        title: title
      }));
    }
  });

  return TodoCollection;
});