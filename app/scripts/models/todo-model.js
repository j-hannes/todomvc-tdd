/* global define */

define([
  'backbone'
], function(Backbone) {
  'use strict';

  var Todo = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false
    },

    toggle: function() {
    }
  });

  return Todo;
});
