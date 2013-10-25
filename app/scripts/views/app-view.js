/* global define */

define([
  'backbone',
  'models/todo-model',
  'views/todo-view',
  'templates'
], function(Backbone, Todo, TodoView, JST) {
  'use strict';

  var AppView = Backbone.View.extend({
    template: JST['app/scripts/templates/app.ejs'],

    events: {
      'keypress #new-todo': 'createOnEnter',
      'click #toggle-all': 'toggleAllComplete'
    },

    initialize: function() {
      if (this.collection) {
        this.listenTo(this.collection, 'add', this.addOne);
      }
    },

    render: function() {
      this.$el.append(this.template());
      return this;
    },

    createOnEnter: function(e) {
      var $input = this.$('#new-todo');
      if (e.which === 13 && $input.val().trim()) {
        this.collection.create({title: $input.val()});
        $input.val('');
      }
    },

    addOne: function(todo) {
      var $todoList = this.$('#todo-list');
      var view = new TodoView({model: todo});
      $todoList.append(view.render().el);
    },

    toggleAllComplete: function() {
      var completed = this.collection.remaining().length > 0;
      this.collection.each(function(todo) {
        todo.save({completed: completed});
      });
    }
  });

  return AppView;
});