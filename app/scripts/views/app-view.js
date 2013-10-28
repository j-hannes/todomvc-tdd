/* global define */

define([
  'backbone',
  'models/todo-model',
  'views/todo-view',
  'views/stats-view',
  'templates'
], function(Backbone, Todo, TodoView, StatsView, JST) {
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
        this.listenTo(this.collection, 'add', this.renderStats);
        this.listenTo(this.collection, 'remove', this.renderStats);
        this.listenTo(this.collection, 'change:completed', this.renderStats);
      }
    },

    render: function() {
      this.$el.append(this.template());
      return this;
    },

    renderStats: function() {
      if (this.statsView === undefined) {
        this.statsView = new StatsView({collection: this.collection});
      }
      this.statsView.render();
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