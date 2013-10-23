/* global define, describe, it, expect, spyOn */

define([
  'models/todo-model'
], function(TodoModel) {
  'use strict';

  describe('Model :: Todos', function() {
    it('sets completed to false by default', function() {
      var todo = new TodoModel();
      expect(todo.get('completed')).toBe(false);
    });
    it('sets title to "" by default', function() {
      var todo = new TodoModel();
      expect(todo.get('title')).toBe('');
    });

    describe('toggle', function() {
      it('sets completed to false if it is true', function() {
        var todo = new TodoModel();
        todo.set('completed', false);

        todo.toggle();

        expect(todo.get('completed')).toBe(true);
      });

      it('sets completed to true if it is false', function() {
        var todo = new TodoModel();
        todo.set('completed', true);

        todo.toggle();

        expect(todo.get('completed')).toBe(false);
      });

      it('calls save on the model', function() {
        var todo = new TodoModel();
        spyOn(todo, 'save');

        todo.toggle();

        expect(todo.save).toHaveBeenCalled();
      });
    });
  });
});