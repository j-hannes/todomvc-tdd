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
      'blur .edit': 'close',
      'keypress .edit': 'createOnEnter'
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
      var value = this.$input.val().trim();
      if (value) {
        this.model.save({title: value});
      } else {
        this.model.destroy();
      }
      this.$el.removeClass('editing');
    },

    createOnEnter: function(e) {
      if (e.which === 13) {
        this.close();
      }
    }
  });

  return TodoView;
});