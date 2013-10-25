/* global define, describe, it, expect, beforeEach */

define([
  'models/todo-model',
  'collections/todo-collection'
], function(TodoModel, TodoCollection) {
  'use strict';

  describe('Collection :: Todos', function() {
    beforeEach(function() {
      this.todos = new TodoCollection();
    });
    it('is referenced to TodoModel', function() {
      expect(this.todos.model).toBe(TodoModel);
    });

    it('uses localStorage "todos-backbone" to save items', function() {
      expect(this.todos.localStorage).toBeDefined();
      expect(this.todos.localStorage.name).toBe('todos-backbone');
    });

    describe('remaining', function() {
      it('returns all incomplete todo models', function() {
        // preparation
        var todo1 = new TodoModel({completed: false});
        var todo2 = new TodoModel({completed: true});
        var todo3 = new TodoModel({completed: false});
        var todos = new TodoCollection([todo1, todo2, todo3]);
        // execution
        var remaining = todos.remaining();
        // check
        expect(remaining).toEqual([todo1, todo3]);
      });
    });
  });
});