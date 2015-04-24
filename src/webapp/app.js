define([
  'lib/js/marked.min',
  'lib/js/nprogress'
], function(Marked, Nprogress) {
  var DEFAULTCONTENTS = 'synopsis';
  var ipc = require('ipc');

  return Backbone.Router.extend({
    routes: {
      'docs/:contents': 'contentsHandler',
      'quit': 'quitHandler',
      '*actions': 'defaultHandler'
    },

    initialize: function() {
      // Marked.setOptions({
      //   highlight: function (code) {
      //     return Highlight.highlightAuto(code).value;
      //   }
      // });
      this.current = null;

      Backbone.history.start();
    },

    toogleMenu: function(contents) {
      if(this.current != null) {
        this.current.parentNode.removeAttribute('class');
      }

      this.current = Backbone.$('a[href="#docs/'+contents+'"]')[0];
      this.current.parentNode.className = 'active';
    },

    contentsLoader: function(contents) {
      return Backbone.ajax({
        url: 'contents/'+contents+'.md',
        beforeSend: function(xhr) {
          Nprogress.start();
        }
      });
    },

    contentsRenderer: function(doc) {
      Backbone.$('.main')[0].innerHTML = Marked(doc);
      Nprogress.done();
    },

    contentsHandler: function(contents) {
      this.toogleMenu(contents);
      this.contentsLoader(contents).done(this.contentsRenderer);
    },

    quitHandler: function() {
      ipc.send('quit');
    },

    defaultHandler: function(action) {
      if(!action) {
        this.contentsLoader(DEFAULTCONTENTS).done(this.contentsRenderer);
        this.toogleMenu(DEFAULTCONTENTS);
      }
    }
  });
});
