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

    describe('DOM event', function() {
      beforeEach(function() {
        // the todo element needs to be in the DOM of the page to react to the
        // click event
        $('body').prepend($('<div id="todo"></div>'));
      });

      afterEach(function() {
        $('#todo').remove();
      });

      function testDomEventHandling(event, selector, method) {
        var view = new TodoView({el: '#todo'});
        view.render();
        spyOn(view, method);
        view.delegateEvents();

        view.$(selector).trigger(event);

        expect(view[method]).toHaveBeenCalled();
      }

      describe('click on .toggle', function() {
        it('calls toggleCompleted', function() {
          testDomEventHandling('click', '.toggle', 'toggleCompleted');
        });
      });

      describe('click on .destroy', function() {
        it('will call clear', function() {
          testDomEventHandling('click', '.destroy', 'clear');
        });
      });

      describe('doubleclick on label', function() {
        it('calls edit', function() {
          testDomEventHandling('dblclick', 'label', 'edit');
        });
      });
    });

    describe('model event', function() {
      describe('change', function() {
        it('calls render', function() {
          var model = new TodoModel();
          var view = new TodoView({model: model});
          spyOn(view, 'render');
          view.initialize();

          model.trigger('change');

          expect(view.render).toHaveBeenCalled();
        });
      });

      describe('destroy', function() {
        it('removes this view', function() {
          var view = new TodoView({model: new TodoModel()});
          spyOn(view, 'remove');
          view.initialize();

          view.model.destroy();

          expect(view.remove).toHaveBeenCalled();
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
      it('should insert the template content into the view $el', function() {
        var view = new TodoView();
        view.render();
        expect(view.$el).toContain('div.view');
        expect(view.$el).toContain('input.edit');
      });

      it('should contains the content only once when called twice', function() {
        var view = new TodoView();
        view.render();
        view.render();
        expect(view.$el.find('div.view').length).toBe(1);
      });

      it('should put the model\'s title inside the <label>', function() {
        var todoText = 'some text 123';
        var view = new TodoView({
          model: new TodoModel({title: todoText})
        });
        view.render();
        expect(view.$('label')).toContainText(todoText);
      });

      it('should check the checkbox if the todo is completed', function() {
        var view = new TodoView({
          model: new TodoModel({completed: true})
        });
        view.render();
        expect(view.$('input.toggle')).toHaveAttr('checked');
      });

      it('should not check the checkbox if todo is not completed', function() {
        var view = new TodoView({
          model: new TodoModel({completed: false})
        });
        view.render();
        expect(view.$('input.toggle')).not.toHaveAttr('checked');
      });

      it('returns the view', function() {
        var view = new TodoView();
        expect(view.render()).toBe(view);
      });

      it('should sync completed attr of model with class of $el', function() {
        var view = new TodoView({model: new TodoModel({completed: true})});
        view.render();
        expect(view.el).toHaveClass('completed');

        view = new TodoView({model: new TodoModel({completed: false})});
        view.render();
        expect(view.el).not.toHaveClass('completed');
      });
    });

    describe('toggleCompleted', function() {
      it('should call toggle on the model', function() {
        var view = new TodoView();
        spyOn(view.model, 'toggle');

        view.toggleCompleted();

        expect(view.model.toggle).toHaveBeenCalled();
      });
    });

    describe('clear', function() {
      it('destroys the model', function() {
        var view = new TodoView({model: new TodoModel()});
        spyOn(view.model, 'destroy');

        view.clear();

        expect(view.model.destroy).toHaveBeenCalled();
      });
    });
  });
});