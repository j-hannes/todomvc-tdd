/* global define, describe, it, expect, beforeEach, afterEach, spyOn */

define([
  'jquery',
  'views/app-view',
  'models/todo-model',
  'collections/todo-collection',
  'backbone',
  'jasmineJquery'
], function($, AppView, TodoModel, TodoCollection, Backbone) {
  'use strict';

  describe('View :: App', function() {
    describe('render', function() {
      beforeEach(function() {
        this.view = new AppView();
      });

      afterEach(function() {
        this.view.remove();
      });

      it('should append the template content to the view\'s DOM element',
         function() {
          this.view.render();
          expect(this.view.$el).toContain('section#todoapp');
          expect(this.view.$el).toContain('div#info');
        }
      );

      it('returns the view', function() {
        expect(this.view.render()).toBe(this.view);
      });
    });

    describe('event', function() {
      beforeEach(function() {
        $('body').prepend($('<div id="app"></div>'));
      });

      afterEach(function() {
        $('#app').remove();
      });

      function testDomEventHandling(event, selector, method) {
        // preparation
        var view = new AppView({el: '#app'});
        view.render();
        spyOn(view, method);
        view.delegateEvents();
        // execution
        view.$(selector).trigger(event);
        // check
        expect(view[method]).toHaveBeenCalled();
      }

      describe('keypress on #new-todo', function() {
        it('calls createOnEnter', function() {
          testDomEventHandling('keypress', '#new-todo', 'createOnEnter');
        });
      });

      describe('click on #toggle-all', function() {
        it('calls toggleAllComplete()', function() {
          testDomEventHandling('click', '#toggle-all', 'toggleAllComplete');
        });
      });

      describe('"add" on this.collection', function() {
        it('calls addOne', function() {
          var view = new AppView({collection: new Backbone.Collection()});
          view.render();
          spyOn(view, 'addOne');
          // events must be bound to the spy
          view.initialize();

          view.collection.trigger('add', new TodoModel());

          expect(view.addOne).toHaveBeenCalled();
        });
      });
    });

    describe('createOnEnter', function() {
      beforeEach(function() {
        var todoCollection = new TodoCollection();
        this.view = new AppView({collection: todoCollection});
        this.view.render();
        spyOn(todoCollection, 'create');
      });

      describe('with the <Enter> key pressed', function() {
        beforeEach(function() {
          this.eventMock = {which: 13};
        });

        describe('with a text other than white space in the input field for ' +
                 'new todos', function() {
          beforeEach(function() {
            this.todoText  = 'something';
            this.view.$('#new-todo').val(this.todoText);
            this.view.createOnEnter(this.eventMock);
          });

          it('calls "create" on the todo collection with a new todo model with ' +
             'the entered text as title', function() {
            expect(this.view.collection.create).toHaveBeenCalled();
            expect(this.view.collection.create.mostRecentCall.args[0])
              .toEqual({title: this.todoText});
          });

          it('empties the input field', function() {
            expect(this.view.$('#new-todo')).toHaveValue('');
          });
        });

        describe('with nothing in the input field',
                 function() {
          it('does not call "create" on the todo collection', function() {
            this.view.$('#new-todo').val('');
            this.view.createOnEnter(this.eventMock);
            expect(this.view.collection.create).not.toHaveBeenCalled();
          });
        });

        describe('with whitespace only in the input field',
                 function() {
          beforeEach(function() {
            this.todoText  = '  ';
            this.view.$('#new-todo').val(this.todoText);
            this.view.createOnEnter(this.eventMock);
          });

          it('does not call "create" on the todo collection', function() {
            expect(this.view.collection.create).not.toHaveBeenCalled();
          });

          it('does not empty the input field', function() {
            expect(this.view.$('#new-todo')).toHaveValue(this.todoText);
          });
        });
      });

      describe('with any other key than <Enter> pressed', function() {
        it('does not call "create" on the todo collection', function() {
          this.eventMock = {which: 56};
          this.todoText  = 'something';
          this.view.$('#new-todo').val(this.todoText);
          this.view.createOnEnter(this.eventMock);
          expect(this.view.collection.create).not.toHaveBeenCalled();
        });
      });
    });

    describe('addOne', function() {
      it('appends another <li> element to ul#todo-list', function() {
        var view = new AppView();
        view.render();

        var todoList = view.$('ul#todo-list');
        var items = todoList.children('li').length;

        view.addOne(new TodoModel());
        expect(todoList.children('li').length).toBe(items + 1);
      });
    });
  });
});