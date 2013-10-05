/* global define, describe, it, expect, beforeEach, afterEach */

define([
  'jquery',
  'views/app',
  'jasmineJquery',
], function($, App) {
  'use strict';
 
  describe('View :: App', function() {
    describe('render()', function() {
      beforeEach(function() {
        $('body').append($('<div id="todoapp"></div>'));
        this.app = new App();
      });
      afterEach(function() {
        this.app.remove();
        $('#todoapp').remove();
      });
      it('returns the view object', function() {
        expect(this.app.render()).toEqual(this.app);
      });
      it('appends the template content to a #todoapp container', function() {
        this.app.render();
        expect($('#todoapp')).toContain('header#header');
        expect($('#todoapp')).toContain('section#main');
        expect($('#todoapp')).toContain('footer#footer');
      });
    });
  });
 
});