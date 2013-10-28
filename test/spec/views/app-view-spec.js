/* global define, describe, it, expect, beforeEach, afterEach, spyOn */

define([
  'jquery',
  'underscore',
  'jasmine',
  'views/app-view',
  'views/stats-view',
  'models/todo-model',
  'collections/todo-collection',
  'jasmineJquery'
], function($, _, jasmine, AppView, StatsView, TodoModel, TodoCollection) {
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

      it('calls updateView()', function() {
        spyOn(this.view, 'updateView');
        this.view.render();
        expect(this.view.updateView).toHaveBeenCalled();
      });

    });

    describe('DOM event', function() {
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
    });

    describe('collection event', function() {
      beforeEach(function() {
        this.view = new AppView({collection: new TodoCollection()});
        this.view.render();
      });

      describe('add', function() {
        it('calls addOne', function() {
          spyOn(this.view, 'addOne');
          this.view.initialize();
          this.view.collection.trigger('add', new TodoModel());
          expect(this.view.addOne).toHaveBeenCalled();
        });

        it('calls updateView', function() {
          spyOn(this.view, 'updateView');
          this.view.initialize();
          this.view.collection.trigger('add');
          expect(this.view.updateView).toHaveBeenCalled();
        });
      });

      describe('remove', function() {
        it('calls updateView', function() {
          spyOn(this.view, 'updateView');
          this.view.initialize();
          this.view.collection.trigger('remove');
          expect(this.view.updateView).toHaveBeenCalled();
        });
      });

      describe('change:completed', function() {
        it('calls updateView', function() {
          spyOn(this.view, 'updateView');
          this.view.initialize();
          this.view.collection.trigger('change:completed');
          expect(this.view.updateView).toHaveBeenCalled();
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

    describe('toggleAllComplete', function() {
      function mockModel(name) {
        return jasmine.createSpyObj(name, ['save', 'set']);
      }

      function mockCollection(name, models) {
        return {
          each: function(iterator) {
            return _.each(models, iterator);
          }
        };
      }

      beforeEach(function() {
        // preparation
        this.todo1 = mockModel('todo-1');
        this.todo2 = mockModel('todo-2');
        this.view = new AppView();
        this.view.collection = mockCollection('todo', [this.todo1, this.todo2]);
      });

      describe('with some todos incomplete', function() {
        it('saves all todos to completed', function() {
          // preparation
          this.view.collection.remaining = function() {
            return {length: 1};
          };
          // execution
          this.view.toggleAllComplete();
          // check
          expect(this.todo1.save).toHaveBeenCalledWith({completed: true});
          expect(this.todo2.save).toHaveBeenCalledWith({completed: true});
        });
      });

      describe('when the #toggle-all checkbox is checked', function() {
        it('saves all todos to incomplete', function() {
          // preparation
          this.view.collection.remaining = function() {
            return {length: 0};
          };
          // execution
          this.view.toggleAllComplete();
          // check
          expect(this.todo1.save).toHaveBeenCalledWith({completed: false});
          expect(this.todo2.save).toHaveBeenCalledWith({completed: false});
        });
      });
    });

    describe('updateView', function() {
      it('hides #main and #footer when no todos', function() {
        var view = new AppView();
        view.render();
        expect(view.$('#main')).toHaveCss({display: 'none'});
        expect(view.$('#footer')).toHaveCss({display: 'none'});
      });

      it('shows #main and #footer when more than one todo', function() {
        var todos = new TodoCollection([new TodoModel()]);
        var view = new AppView({collection: todos});
        view.render();
        expect(view.$('#main')).toHaveCss({display: 'block'});
        expect(view.$('#footer')).toHaveCss({display: 'block'});
      });
    });

    describe('renderStats', function() {
      it('instanciates a StatsView if there is none', function() {
        var view = new AppView();
        view.statsView = undefined;
        view.renderStats();
        expect(view.statsView instanceof StatsView).toBe(true);
      });

      it('does not instanciates a new StatsView if there is one', function() {
        var view = new AppView();
        var mock = {render: function() {}};
        view.statsView = mock;
        view.renderStats();
        expect(view.statsView).toBe(mock);
      });

      it('calls render() on the stats view', function() {
        var view = new AppView();
        view.statsView = {render: function() {}};
        spyOn(view.statsView, 'render');
        view.renderStats();
        expect(view.statsView.render).toHaveBeenCalled();
      });
    });
  });
});