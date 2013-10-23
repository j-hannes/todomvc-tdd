/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/todo-model'
], function ($, _, Backbone, JST, TodoModel) {
  'use strict';

  var TodoView = Backbone.View.extend({
    tagName: 'li',

    template: JST['app/scripts/templates/todo.ejs'],

    events: {
      'click .toggle': 'toggleCompleted'
    },

    initialize: function() {
      if (!this.model) {
        this.model = new TodoModel();
      }
    },

    render: function() {
      this.$el.append(this.template(this.model.toJSON()));
      return this;
    },

    toggleCompleted: function() {
    }
  });

  return TodoView;
});