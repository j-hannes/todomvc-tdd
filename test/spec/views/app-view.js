/* global define, describe, it, expect, beforeEach, afterEach, spyOn */

define([
  'views/app-view',
  'jasmineJquery'
], function(AppView) {
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

      it('returns the view element', function() {
        expect(this.view.render()).toBe(this.view.el);
      });
    });

    describe('keypress #new-todo', function() {
      it('calls createOnEnter', function() {
        var view = new AppView();
        view.render();
        spyOn(view, 'createOnEnter');
        // events must be rebound after creating the spy
        view.delegateEvents();

        view.$('#new-todo').trigger('keypress');

        expect(view.createOnEnter).toHaveBeenCalled();
      });
    });

    describe ('createOnEnter', function() {
      describe('with the <Enter> key pressed', function() {

        beforeEach(function() {
          // preparation
          var collectionMock = {createTodo: function() {}};
          this.eventMock = {which: '13'};
          this.view = new AppView({collection: collectionMock});
          this.view.render();
          spyOn(collectionMock, 'createTodo');
        });

        describe('with a text other than white space in the input field for ' +
                 'new todos', function() {

          beforeEach(function() {
            // preparation
            this.todoText  = 'something';
            this.view.$('#new-todo').val(this.todoText);

            // execution
            this.view.createOnEnter(this.eventMock);
          });

          it('calls "create" on the todos collection', function() {
            // check
            expect(this.view.collection.createTodo).toHaveBeenCalledWith(
              this.todoText);
          });

          it('empties the input field', function() {
            // check
            expect(this.view.$('#new-todo')).toHaveValue('');
          });
        });

        describe('with nothing in the input field',
                 function() {
          it('does not call "create on the todos collection', function() {
            // preparation
            this.view.$('#new-todo').val('');

            // execution
            this.view.createOnEnter(this.eventMock);

            // check
            expect(this.view.collection.createTodo).not.toHaveBeenCalled();
          });
        });

        describe('with whitespace only in the input field',
                 function() {
          beforeEach(function() {
            // preparation
            this.todoText  = '  ';
            this.view.$('#new-todo').val(this.todoText);

            // execution
            this.view.createOnEnter(this.eventMock);
          });

          it('does not call "create on the todos collection', function() {
            // check
            expect(this.view.collection.createTodo).not.toHaveBeenCalled();
          });

          it('does not empty the input field', function() {
            // check
            expect(this.view.$('#new-todo')).toHaveValue(this.todoText);
          });
        });
      });
    });
  });
});