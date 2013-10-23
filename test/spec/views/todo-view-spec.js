/* global define, describe, it, expect, beforeEach, afterEach, spyOn */

define([
  'jquery',
  'models/todo-model',
  'views/todo-view',
  'jasmineJquery'
], function($, TodoModel, TodoView) {
  'use strict';

  describe('View :: Todo', function() {
    describe('tagName', function() {
      it('should be <li>', function() {
        var view = new TodoView();
        expect(view.tagName).toBe('li');
      });
    });

    describe('event', function() {
      describe('click on .toggle', function() {
        beforeEach(function() {
          // the todo element needs to be in the DOM of the page to react to the
          // click event
          $('body').prepend($('<div id="todo"></div>'));
        });

        afterEach(function() {
          $('#todo').remove();
        });

        it('calls toggleCompleted', function() {
          var view = new TodoView({el: '#todo'});
          view.render();
          spyOn(view, 'toggleCompleted').andCallThrough();
          view.delegateEvents();
          view.$('.toggle').first().trigger('click');
          expect(view.toggleCompleted).toHaveBeenCalled();
        });
      });
    });

    describe('initialize', function() {
      it('should create a new todo model if this is not passed', function() {
        var view = new TodoView();
        expect(view.model instanceof TodoModel).toBe(true);
      });
    });

    describe('render', function() {
      it('should append the template content to the view\'s DOM element',
         function() {
          var view = new TodoView();
          view.render();
          expect(view.$el).toContain('div.view');
          expect(view.$el).toContain('input.edit');
        }
      );

      it('should put the model\'s title inside the <label>', function() {
        var todoText = 'some text 123';
        var view = new TodoView({
          model: new TodoModel({title: todoText})
        });
        view.render();
        expect(view.$('label')).toContainText(todoText);
      });

      it('should check the checkbox if the model todo is completed',
         function() {
          var view = new TodoView({
            model: new TodoModel({completed: true})
          });
          view.render();
          expect(view.$('input.toggle')).toHaveAttr('checked');
        }
      );

      it('should not check the checkbox if the model todo is not completed',
         function() {
          var view = new TodoView({
            model: new TodoModel({completed: false})
          });
          view.render();
          expect(view.$('input.toggle')).not.toHaveAttr('checked');
        }
      );

      it('returns the view', function() {
        var view = new TodoView();
        expect(view.render()).toBe(view);
      });
    });
  });
});