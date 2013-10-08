/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'models/todo',
  'collections/todo'
], function($, _, Backbone, JST, Todo, TodoCollection) {
  'use strict';

  var AppView = Backbone.View.extend({
    template: JST['app/scripts/templates/app.ejs'],

    el: '#todoapp',

    events: {
      'keypress #new-todo': 'createOnEnter'
    },

    initialize: function() {
      this.collection = new TodoCollection();
    },

    render: function() {
      this.$el.append(this.template());
      return this;
    },

    createOnEnter: function() {
      this.collection.add(new Todo());
    }
  });

  return AppView;
});