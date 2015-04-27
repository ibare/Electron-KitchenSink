requirejs.config({
  baseUrl: './',

  paths: {
    'jquery': 'lib/js/jquery.min',
    'underscore': 'lib/js/underscore',
    'backbone': 'lib/js/backbone',
    'bootstrap': 'lib/js/bootstrap.min',
    'handlebars': 'lib/js/handlebars.min',
    'marked': 'lib/js/marked.min',
    'highlight': 'lib/js/highlight.pack',
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
