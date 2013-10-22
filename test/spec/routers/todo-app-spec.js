/* global define, describe, it, expect, beforeEach, afterEach */

define([
  'jquery',
  'routers/todo-app',
  'collections/todo-collection',
  'jasmineJquery'
], function($, TodoApp, TodoCollection) {
  'use strict';

  describe('Router :: TodoApp', function() {
    describe('initialize', function() {
      beforeEach(function() {
        this.app = new TodoApp();
      });

      afterEach(function() {
        this.app.view.remove();
      });

      it('should prepend the rendered HTML of an instanciated AppView to the ' +
         'document body' , function() {
        expect($('body').children()[0]).toBe(this.app.view.el);
      });

      it('creates a new todo collection', function() {
        expect(this.app.view.collection).toBeDefined();
        expect(this.app.view.collection instanceof TodoCollection).toBe(true);
      });
    });
  });
});
