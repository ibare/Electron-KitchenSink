requirejs.config({
  baseUrl: './',

  paths: {
    'jquery': 'lib/js/jquery.min',
    'underscore': 'lib/js/underscore',
    'backbone': 'lib/js/backbone',
    'bootstrap': 'lib/js/bootstrap.min',
    'handlebars': 'lib/js/handlebars.min',
    'marked': 'lib/js/marked.min',
    'app': 'browser/app'
  },

  shim: {
    'bootstrap': ['jquery'],
    'app': {
      deps: ['jquery', 'backbone']
    }
  }
});

define(['app'], function(App) {
  window.App = new App();
});
