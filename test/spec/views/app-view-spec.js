/* global define, describe, it, expect, beforeEach, afterEach, spyOn */

define([
  'jquery',
  'underscore',
  'backbone',
  'views/app',
  'models/todo',
  'collections/todo',
  'jasmineJquery'
], function($, _, Backbone, App, Todo, TodoCollection) {
  'use strict';
 
  $.fn.pressKeys = function(string) {
    var keys = {
      '\n': 13,
      ' ': 32,
      'e': 69,
      'g': 71,
      'i': 73,
      'k': 75,
      'l': 76,
      'm': 77,
      'o': 79,
      's': 83,
      't': 84
    };
    _.each(string, function(char) {
      var e = $.Event('keypress');
      e.which   = keys[char];
      e.keyCode = keys[char];
      this.trigger(e);
      if (e.which !== 13) {
        this.val(this.val() + char);
      }
    }, this);
  };

  describe('View :: App', function() {
    describe('render()', function() {
      beforeEach(function() {
        this.app = new App();
        this.app.render();
      });

      afterEach(function() {
        this.app.remove();
        $('body').append('<section id="todoapp"></section>');
      });

      it('returns the view object', function() {
        expect(this.app.render()).toEqual(this.app);
      });

      it('appends the template content to a #todoapp container', function() {
        expect($('#todoapp')).toContain('header#header');
        expect($('#todoapp')).toContain('section#main');
        expect($('#todoapp')).toContain('footer#footer');
      });
    });

    describe('initialization', function() {
      it('attaches a todo collection', function() {
        var app = new App();
        expect(app.collection instanceof TodoCollection).toBeTruthy();
      });
    });

    describe('Entering a new todo, followed by <Enter>', function() {
      var todoText = 'get some milk';
      var app;

      beforeEach(function() {
        app = new App();
        app.render();

        spyOn(app.collection, 'addTodo');
      });

      afterEach(function() {
        app.remove();
        $('body').append('<section id="todoapp"></section>');
      });

      describe('with text "' + todoText + '"', function() {
        beforeEach(function() {
          $('input#new-todo').pressKeys(todoText + '\n');
        });

        it('should call collection.addTodo (once)', function() {
          expect(app.collection.addTodo).toHaveBeenCalled();
          expect(app.collection.addTodo.calls.length).toBe(1);
        });

        it('should call collection.addTodo with', function() {
          expect(app.collection.addTodo).toHaveBeenCalledWith(todoText);
        });
      });

      describe('with text ""', function() {
        beforeEach(function() {
          $('input#new-todo').pressKeys('   \n');
        });

        it('should not call collection.addTodo', function() {
          expect(app.collection.addTodo).not.toHaveBeenCalled();
        });
      });

      describe('with text "   "', function() {
        beforeEach(function() {
          $('input#new-todo').pressKeys('   \n');
        });

        it('should not call collection.addTodo', function() {
          expect(app.collection.addTodo).not.toHaveBeenCalled();
        });
      });
    });
  });

 
});