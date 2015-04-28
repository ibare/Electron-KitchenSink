requirejs.config({
  baseUrl: './',

  paths: {
    'jquery': 'lib/js/jquery',
    'underscore': 'lib/js/underscore',
    'backbone': 'lib/js/backbone',
    'bootstrap': 'lib/js/bootstrap',
    'handlebars': 'lib/js/handlebars',
    'marked': 'lib/js/marked',
    'highlight': 'lib/js/highlight',
    'nprogress': 'lib/js/nprogress',
    'app': 'browser/app'
  },

  shim: {
    'bootstrap': ['jquery'],
    'highlight': {
      exports: 'hljs'
    },
    'app': {
      deps: ['jquery', 'backbone']
    }
  }
});

define(['app'], function(App) {
  window.App = new App();
});
