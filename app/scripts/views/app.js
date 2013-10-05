/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var AppView = Backbone.View.extend({
    template: JST['app/scripts/templates/app.ejs'],

    el: '#todoapp',

    render: function() {
      this.$el.append(this.template());
      return this;
    }
  });

  return AppView;
});