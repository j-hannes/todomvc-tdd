/* global define, describe, it, expect */

define([
  'routers/todo-app',
  'jasmineJquery'
], function(TodoApp) {
  'use strict';

  describe('Given I have opened a browser', function() {
    // no action necessary, it is assumed the browser is open

    describe('When I have loaded the application', function() {
      var app = new TodoApp();
      app.start();

      it('Then I should see the input for new todos', function() {
        expect($('body')).toContain('input#new-todo');
      });

      it('And I should see the todo list', function() {
        expect($('body')).toContain('ul#todo-list');
      });
    });
  });
});