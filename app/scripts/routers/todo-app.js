/* global define */

define([
  'jquery',
  'views/app-view'
], function($, AppView) {
  'use strict';

  var TodoApp = function() {
    this.start = function() {
      this.view = new AppView();
      this.view.render();
      $('body').prepend(this.view.el);
    };
  };

  return TodoApp;
});