/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'collections/todo'
], function($, _, Backbone, JST, TodoCollection) {
  'use strict';

  var AppView = Backbone.View.extend({
    template: JST['app/scripts/templates/app.ejs'],

    el: '#todoapp',

    initialize: function() {
      this.collection = new TodoCollection();
    },

    render: function() {
      this.$el.append(this.template());
      return this;
    }
  });

  return AppView;
});