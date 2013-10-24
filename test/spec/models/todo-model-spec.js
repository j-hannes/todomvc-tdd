/* global define, describe, it, expect, spyOn, beforeEach */

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
      beforeEach(function() {
        // if we use the model standalone it does not know we are using a local
        // storage so we need to add a url otherwise save will cause an error
        TodoModel = TodoModel.extend({urlRoot: '/'});
      });

      it('sets completed to false if it is true', function() {
        var todo = new TodoModel();
        todo.set('completed', false);
        spyOn(todo, 'save').andCallFake(function(attrs) {
          this.set(attrs);
        });

        todo.toggle();

        expect(todo.get('completed')).toBe(true);
      });

      it('sets completed to true if it is false', function() {
        var todo = new TodoModel();
        todo.set('completed', true);
        spyOn(todo, 'save').andCallFake(function(attrs) {
          this.set(attrs);
        });

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