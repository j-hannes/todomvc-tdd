/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var TodoModel = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false
    }
  });

  return TodoModel;
});