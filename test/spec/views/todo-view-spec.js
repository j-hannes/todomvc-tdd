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

      describe('blur .edit', function() {
        it('calls close', function() {
          testDomEventHandling('blur', '.edit', 'close');
        });
      });

      describe('keypress .edit', function() {
        it('calls createOnEnter()', function() {
          testDomEventHandling('keypress', '.edit', 'createOnEnter');
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

    describe('edit', function() {
      it('add a class "editing" to the view $el', function() {
        var view = new TodoView();
        view.render();

        view.edit();

        expect(view.$el).toHaveClass('editing');
      });

      it('calls focus on the view\'s input field', function() {
        var view = new TodoView();
        view.render();
        spyOn(view.$input, 'focus');

        view.edit();

        expect(view.$input.focus).toHaveBeenCalled();
      });
    });

    describe('close', function() {
      it('removes class "editing" from the view $el', function() {
        // preparation
        var view = new TodoView();
        view.render();
        view.$el.addClass('editing');
        // execution
        view.close();
        // check
        expect(view.$el).not.toHaveClass('editing');
      });

      describe('with only whitespace in the input', function() {
        it('destroys the model', function() {
          // preparation
          var view = new TodoView();
          view.render();
          view.$('input').val(' ');
          spyOn(view.model, 'destroy');
          // execution
          view.close();
          // check
          expect(view.model.destroy).toHaveBeenCalled();
        });
      });

      describe('with a value in the input', function() {
        it('does not destroy the model', function() {
          // preparation
          TodoModel = TodoModel.extend({urlRoot: '/'});
          var view = new TodoView({model: new TodoModel()});
          view.render();
          view.$('input').val('do something');
          spyOn(view.model, 'save');
          spyOn(view.model, 'destroy');
          // execution
          view.close();
          // check
          expect(view.model.destroy).not.toHaveBeenCalled();
        });

        it('calls save() on the model with value as title', function() {
          // preparation
          TodoModel = TodoModel.extend({urlRoot: '/'});
          var view = new TodoView();
          var todoText = 'do something';
          view.render();
          view.$('input').val(todoText);
          spyOn(view.model, 'save').andCallFake(function(attrs) {
            this.set(attrs);
          });
          // execution
          view.close();
          // check
          expect(view.model.save).toHaveBeenCalled();
          expect(view.model.get('title')).toBe(todoText);
        });
      });
    });

    describe('createOnEnter', function() {
      it('calls close() when <ENTER> was pressed', function() {
        // preparation
        var view = new TodoView();
        var ENTER_KEY = 13;
        var e = {which: ENTER_KEY};
        spyOn(view, 'close');
        // execution
        view.createOnEnter(e);
        // check
        expect(view.close).toHaveBeenCalled();
      });

      it('does not call close() when <ENTER> was not pressed', function() {
        // preparation
        var view = new TodoView();
        var ENTER_KEY = 42;
        var e = {which: ENTER_KEY};
        spyOn(view, 'close');
        // execution
        view.createOnEnter(e);
        // check
        expect(view.close).not.toHaveBeenCalled();
      });
    });
  });
});