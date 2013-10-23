/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var TodoView = Backbone.View.extend({
    tagName: 'li',

    template: JST['app/scripts/templates/todo.ejs'],

    initialize: function() {
      if (!this.model) {
        throw new Error('no model passed to view');
      }
    },

    render: function() {
      this.$el.append(this.template(this.model.toJSON()));
      return this;
    },
  });

  return TodoView;
});