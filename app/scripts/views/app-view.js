/* global define */

define([
  'backbone',
  'models/todo-model',
  'templates'
], function(Backbone, Todo, JST) {
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

    createOnEnter: function(e) {
      var $input = this.$('#new-todo');
      if (e.which === 13 && $input.val().trim()) {
        //var todo = new Todo({title: $input.val()});
        //this.collection.add(todo);
        this.collection.create({title: $input.val()});
        $input.val('');
      }
    }
  });

  return AppView;
});