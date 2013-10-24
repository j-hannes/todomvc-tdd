/* global define, describe, it, expect, beforeEach, afterEach, spyOn */

define([
  'jquery',
  'routers/todo-app',
  'collections/todo-collection',
  'jasmineJquery'
], function($, TodoApp, TodoCollection) {
  'use strict';

  describe('Router :: TodoApp', function() {
    beforeEach(function() {
      this.app = new TodoApp();
    });

    afterEach(function() {
      this.app.view.remove();
    });

    describe('initialize', function() {
      it('should prepend the rendered HTML of an instanciated AppView to the ' +
         'document body' , function() {
        expect($('body').children()[0]).toBe(this.app.view.el);
      });

      it('creates a new todo collection', function() {
        expect(this.app.view.collection).toBeDefined();
        expect(this.app.view.collection instanceof TodoCollection).toBe(true);
      });
    });

    describe('start', function() {
      it('should call fetch on the todos collection', function() {
        spyOn(this.app.todos, 'fetch');
        this.app.start();
        expect(this.app.todos.fetch).toHaveBeenCalled();
      });
    });
  });
});
