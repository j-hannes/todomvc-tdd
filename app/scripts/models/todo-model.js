/* global define */

define([
  'backbone'
], function(Backbone) {
  'use strict';

  var Todo = Backbone.Model.extend({
    defaults: {
      completed: false
    }
  });

  return Todo;
});
