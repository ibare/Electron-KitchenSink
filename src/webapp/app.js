define([
  'lib/js/marked.min'
], function(Marked) {
  return Backbone.Router.extend({
    routes: {
      'docs/:contents': 'contentsHandler',
      'quit': 'quitHandler',
      '*actions': 'defaultHandler'
    },

    initialize: function() {
      Backbone.history.start();
    },

    contentsHandler: function(contents) {
      Backbone.ajax({
        url: 'contents/'+contents+'.md'
      }).done(function(doc) {
        Backbone.$('.main')[0].innerHTML = Marked(doc);
      });
    },

    quitHandler: function() {
      alert('quit!');
    },

    defaultHandler: function(action) {
      alert('Welcome Electron Kitchen Sink');
    }
  });
});
