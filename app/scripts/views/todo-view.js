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
      'click .destroy': 'clear',
      'dblclick label': 'edit',
      'blur .edit': 'close'
    },

    initialize: function() {
      if (!this.model) {
        this.model = new TodoModel();
      }
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('completed', this.model.get('completed'));
      this.$input = this.$('.edit');
      return this;
    },

    toggleCompleted: function() {
      this.model.toggle();
    },

    clear: function() {
      this.model.destroy();
    },

    edit: function() {
      this.$el.addClass('editing');
      this.$input.focus();
    },

    close: function() {
    }
  });

  return TodoView;
});