require.config({
  baseUrl: 'scripts',
  // urlArgs: 'cb=' + Math.random(),

  paths: {
    // app components
    jquery:     '/components/jquery/jquery',
    underscore: '/components/underscore/underscore',
    backbone:   '/components/backbone/backbone',
    backboneLocalstorage: '/components/backbone.localStorage/' +
                          'backbone.localStorage',

    // test components
    jasmine:       '/components/jasmine/lib/jasmine-core/jasmine',
    jasmineHtml:   '/components/jasmine/lib/jasmine-core/jasmine-html',
    jasmineJquery: '/components/jasmine-jquery/lib/jasmine-jquery',

    templates: '/templates/templates',
    features: '../features',
    spec: '../spec'
  },

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
    },
    jasmine: {
      exports: 'jasmine'
    },
    jasmineHtml: {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});

require([
  'underscore',
  'jquery',
  'jasmineHtml'
], function(_, $, jasmine){
  'use strict';

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];

  // features
  // specs.push('features/01-user-interface');

  // specs
  specs.push('spec/collections/todo-collection-spec');
  specs.push('spec/models/todo-model-spec');
  specs.push('spec/routers/todo-app-spec');
  specs.push('spec/views/app-view-spec');
  specs.push('spec/views/todo-view-spec');
  specs.push('spec/views/stats-view-spec');

  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });

});