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
      'click .toggle': 'toggleCompleted',
      'click .destroy': 'clear'
    },

    initialize: function() {
      if (!this.model) {
        this.model = new TodoModel();
      }
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('completed', this.model.get('completed'));
      return this;
    },

    toggleCompleted: function() {
      this.model.toggle();
    },

    clear: function() {
      this.model.destroy();
    }
  });

  return TodoView;
});