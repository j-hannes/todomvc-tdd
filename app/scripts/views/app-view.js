/* global define */

define([
  'backbone',
  'templates'
], function(Backbone, JST) {
  'use strict';

  var AppView = Backbone.View.extend({
    template: JST['app/scripts/templates/app.ejs'],

    events: {
      'keypress #new-todo': 'createOnEnter'
    },

    render: function() {
      this.$el.append(this.template());
      return this.el;
    },

    createOnEnter: function() {
      var $input = this.$('#new-todo');
      if ($input.val().trim()) {
        this.collection.createTodo($input.val());
        $input.val('');
      }
    }
  });

  return AppView;
});