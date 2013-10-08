/* global define, describe, it, expect, beforeEach, afterEach, */

define([
  'jquery',
  'underscore',
  'backbone',
  'models/todo',
  'jasmineJquery'
], function($, _, Backbone, Todo) {
  'use strict';

  describe('Model :: Todo', function() {

    describe('new', function() {
      var todo;

      beforeEach(function() {
        todo = new Todo();
      });

      it('should have an empty title by default', function() {
        expect(todo.get('title')).toBe('');
      });

      it('should be set to "incomplete" by default', function() {
        expect(todo.get('completed')).toBe(false);
      });
    });
  });
});