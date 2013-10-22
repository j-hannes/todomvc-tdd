/* global define, describe, it, expect, beforeEach, afterEach, spyOn */

define([
  'models/todo-model',
  'views/todo-view',
  'jasmineJquery'
], function(TodoModel, TodoView) {
  'use strict';

  describe('View :: Todo', function() {
    describe('tagName', function() {
      it('should be <li>', function() {
        var view = new TodoView();
        expect(view.tagName).toBe('li');
      });
    });

    describe('render', function() {
      beforeEach(function() {
        this.view = new TodoView({
          model: new TodoModel({title: 'some text'})
        });
        this.view.render();
      });

      afterEach(function() {
        this.view.remove();
      });

      it('should append the template content to the view\'s DOM element',
         function() {
          expect(this.view.$el).toContain('div.view');
          expect(this.view.$el).toContain('input.edit');
        }
      );

      it('should put the model\'s title inside the <label>', function() {
        var title = this.view.model.get('title');
        expect(this.view.$('label')).toContainText(title);
      });

      it('returns the view', function() {
        expect(this.view.render()).toBe(this.view);
      });
    });
  });
});