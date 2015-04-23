requirejs.config({
  baseUrl: 'browser',

  shim: {
    'lib/js/jquery.min': {
      exports: '$'
    },

    'lib/js/underscore': {
      exports: '_'
    },

    'lib/js/backbone': {
      deps: ['lib/js/underscore'],
      exports: 'Babckbone'
    },

    app: {
      deps: [
        'lib/js/jquery.min',
        'lib/js/underscore',
        'lib/js/backbone'
      ]
    }
  }
});

define(['app'], function(App) {
  window.App = new App();
});
