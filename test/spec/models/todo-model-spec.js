/* global define, describe, it, expect, beforeEach, afterEach */

define([
  'models/todo-model'
], function(Todo) {
  'use strict';

  describe('Model :: Todos', function() {
    it('sets "completed" to "false" by default', function() {
      var todo = new Todo();
      expect(todo.get('completed')).toBe(false);
    });
  });
});