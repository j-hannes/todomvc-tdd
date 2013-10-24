/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    backboneLocalstorage: {
      deps: ['backbone'],
      exports: 'Store'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/jquery',
    underscore: '../bower_components/underscore/underscore',
    backbone: '../bower_components/backbone/backbone',
    backboneLocalstorage: '../bower_components/backbone.localStorage/' +
                          'backbone.localStorage'
  }
});

require([
  'routers/todo-app'
], function (TodoApp) {
  var app = new TodoApp();
  app.start();
});
