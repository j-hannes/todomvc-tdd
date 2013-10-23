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
        var view = new TodoView({model: new TodoModel()});
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
          var view = new TodoView({model: new TodoModel(), el: '#todo'});
          view.render();
          spyOn(view, 'toggleCompleted').andCallThrough();
          view.delegateEvents();
          view.$('.toggle').first().trigger('click');
          expect(view.toggleCompleted).toHaveBeenCalled();
        });
      });
    });

    describe('initialize', function() {
      it('should throw an error if no model is passed', function() {
        var viewWithoutModel = function() {
          new TodoView();
        };
        expect(viewWithoutModel).toThrow(new Error('no model passed to view'));
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

      it('should check the checkbox if the model todo is completed',
         function() {
          var view = new TodoView({
            model: new TodoModel({completed: true})
          });
          view.render();
          expect(view.$('input.toggle')).toHaveAttr('checked');
        }
      );

      it('returns the view', function() {
        expect(this.view.render()).toBe(this.view);
      });
    });
  });
});