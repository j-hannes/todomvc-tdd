/* global define, describe, it, expect */

define([
  'views/app',
  'jasmineJquery'
], function(App) {
  'use strict';
 
  describe('View :: App', function() {
    describe('render()', function() {
      it('returns the view object', function() {
        this.app = new App();
        expect(this.app.render()).toEqual(this.app);
      });
    });
  });
 
});