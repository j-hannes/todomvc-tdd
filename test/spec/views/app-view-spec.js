/* global define, describe, it, expect, beforeEach, afterEach */

define([
  'jquery',
  'underscore',
  'backbone',
  'views/app',
  'models/todo',
  'collections/todo',
  'jasmineJquery'
], function($, _, Backbone, App, TodoModel, TodoCollection) {
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
      e.which = keys[char];
      e.keyCode = keys[char];
      this.trigger(e);
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

      var app = new App();
      app.render();

      var numberOfTodos = app.collection.length;
      var todoText = 'get some milk';

      it('should not already contain "' + todoText + '"', function() {
        expect(app.collection.pluck('title')).not.toContain(todoText);
      });

      // enter the text, followed by enter
      $('input#new-todo').val(todoText);

      // press enter
      $('input#new-todo').pressKeys(todoText + '\n');

      it('should create a new todo in the todos collection', function() {
        expect(app.collection.length).toBe(numberOfTodos + 1);
        expect(
          app.collection.at(app.collection.length - 1) instanceof TodoModel)
            .toBeTruthy();
      });

      app.remove();
      $('body').append('<section id="todoapp"></section>');
    });
  });

 
});