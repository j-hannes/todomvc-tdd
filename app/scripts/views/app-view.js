/* global define */

define([
  'backbone',
  'collections/todo-collection',
  'views/todo-view',
  'views/stats-view',
  'templates'
], function(Backbone, TodoCollection, TodoView, StatsView, JST) {
  'use strict';

  var AppView = Backbone.View.extend({
    template: JST['app/scripts/templates/app.ejs'],

    events: {
      'keypress #new-todo': 'createOnEnter',
      'click #toggle-all': 'toggleAllComplete'
    },

    initialize: function() {
      if (!this.collection) {
        this.collection = new TodoCollection();
      }

      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'add', this.updateView);
      this.listenTo(this.collection, 'remove', this.updateView);
      this.listenTo(this.collection, 'change:completed', this.updateView);
    },

    render: function() {
      this.$el.html(this.template());
      this.updateView();
      return this;
    },

    updateView: function() {
      if (this.collection.length > 0) {
        this.$('#main, #footer').show();
        this.renderStats();
      } else {
        this.$('#main, #footer').hide();
      }
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