/* global define, describe, it, expect, beforeEach, afterEach */

define([
  'jquery',
  'backbone',
  'views/app',
  'jasmineJquery'
], function($, Backbone, App) {
  'use strict';
 
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
        expect(app.collection instanceof Backbone.Collection).toBeTruthy();
      });
    });
  });
 
});