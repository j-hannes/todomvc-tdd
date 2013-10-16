/* global define, describe, it, expect, beforeEach, afterEach */

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
  });
});