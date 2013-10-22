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

    render: function() {
      this.$el.append(this.template({
        completed: false,
        title: this.model.get('title')
      }));
      return this;
    },
  });

  return TodoView;
});