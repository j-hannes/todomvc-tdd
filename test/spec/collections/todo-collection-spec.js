/* global define, describe, it, expect, beforeEach, afterEach, */

define([
  'jquery',
  'underscore',
  'backbone',
  'models/todo',
  'collections/todo',
  'jasmineJquery'
], function($, _, Backbone, Todo, TodoCollection) {
  'use strict';

  describe('Collection :: Todos', function() {

    describe('addTodo', function() {
      var todoText = 'get some milk',
          todos;

      beforeEach(function() {
        todos = new TodoCollection();
        todos.addTodo(todoText);
      });

      it('adds a new todo model', function() {
        expect(todos.length).toBe(1);
      });

      it('adds the model with the submitted title', function() {
        expect(todos.at(todos.length - 1).get('title')).toBe(todoText);
      });
    });
  });
});