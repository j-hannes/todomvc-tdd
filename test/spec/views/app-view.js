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
        describe('with a text other than white space in the input field for ' +
                 'new todos', function() {
          it('calls "create" on the todos collection', function() {
            // preparation
            var collectionMock = {createTodo: function() {}};
            var view      = new AppView({collection: collectionMock});
            var eventMock = {which: '13'};
            var todoText  = 'something';

            view.render();
            view.$('#new-todo').val(todoText);
            spyOn(collectionMock, 'createTodo');

            // execution
            view.createOnEnter(eventMock);

            // check
            expect(view.collection.createTodo).toHaveBeenCalledWith(todoText);
          });

          it('empties the input field', function() {

          });
        });

        describe('with nothing or only whitespace in the input field',
                 function() {
          it('does not call "create on the todos collection', function() {

          });

          it('does not empty the input field', function() {

          });
        });
      });

      describe('with any alphanumeric key pressed', function() {
        it('adds that char or digit to the input field', function() {

        });
      });
    });
  });
});