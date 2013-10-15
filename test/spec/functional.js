/* global define, describe, it, expect */

define([
  'jquery',
  'views/app',
  'jasmineJquery',
], function($, App) {
  'use strict';
  describe('Entering a new todo, followed by <enter>', function() {
    // as in main.js
    var app = new App();
    app.render();

    // fetch number of current todo items
    var todoList = $('ul#todo-list');
    var numberOfCurrentItems = todoList.children('li').length;

    it('creates a new todo item in the todo list with the entered ' +
       'text', function() {
      var todoText = 'get some milk';

      // the text should not already be in the list
      expect(todoList.find('label')).not.toContainText(todoText);

      // simulate entering of todo text followed by enter
      var e = $.Event('keypress');
      e.which = 13;
      e.keyCode = 13;
      $('input#new-todo').val(todoText).trigger(e);

      // now the text should be in the list
      expect(todoList.find('label')).toContainText(todoText);
    });
  });
});