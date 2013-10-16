/* global define, describe, it, expect, beforeEach, afterEach */

define([
  'routers/todo-app',
  'jasmineJquery'
], function(TodoApp) {
  'use strict';

  describe('Router :: TodoApp', function() {
    describe('start', function() {
      beforeEach(function() {
        this.app = new TodoApp();
        this.app.start();
      });

      afterEach(function() {
        this.app.view.remove();
      });

      it('should prepend the rendered HTML of an instanciated AppView to the ' +
         'document body' , function() {
        expect($('body').children()[0]).toBe(this.app.view.el);
      });
    });
  });
});
