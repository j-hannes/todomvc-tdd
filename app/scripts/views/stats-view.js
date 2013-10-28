/* global define */

define([
  'backbone',
  'collections/todo-collection',
  'templates'
], function(Backbone, TodoCollection, JST) {
  'use strict';

  var StatsView = Backbone.View.extend({
    el: '#footer',

    template: JST['app/scripts/templates/stats.ejs'],

    initialize: function() {
      if (!this.collection) {
        this.collection = new TodoCollection();
      }
    },

    render: function() {
      this.$el.html(this.template({
        completed: this.collection.completed().length,
        remaining: this.collection.remaining().length
      }));
      return this;
    }
  });

  return StatsView;
});
