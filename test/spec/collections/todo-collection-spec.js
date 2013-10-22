/* global define, describe, it, expect, beforeEach, afterEach */

define([
  'models/todo-model',
  'collections/todo-collection'
], function(Todo, TodoCollection) {
  'use strict';

  describe('Collection :: Todos', function() {
    beforeEach(function() {
      this.todos = new TodoCollection();
    });
    it('is referenced to TodoModel', function() {
      expect(this.todos.model).toBe(Todo);
    });

    it('uses localStorage "todos-backbone" to save items', function() {
      expect(this.todos.localStorage).toBeDefined();
      expect(this.todos.localStorage.name).toBe('todos-backbone');
    });
  });
});