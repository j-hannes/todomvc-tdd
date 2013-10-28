/* global define, describe, it, expect, beforeEach, afterEach */

define([
  'jquery',
  'views/stats-view',
  'jasmineJquery'
], function($, StatsView) {
  'use strict';

  describe('View :: Stats', function() {
    describe('render', function() {
      beforeEach(function() {
        $('body').prepend($('<div id="footer"></div>'));
      });
      afterEach(function() {
        $('#footer').remove();
      });

      it('should insert the template content into the view $el', function() {
        var view = new StatsView();
        view.render();
        expect(view.$el).toContain('span#todo-count');
        expect(view.$el).toContain('ul#filters');
      });

      it('returns the view', function() {
        var view = new StatsView();
        expect(view.render()).toBe(view);
      });
    });
  });
});
