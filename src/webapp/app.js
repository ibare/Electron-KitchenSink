define([
  'handlebars',
  'highlight',
  'marked',
  'nprogress'
], function(Handlebars, Hljs, Marked, Nprogress) {
  var DEFAULTCONTENTS = 'synopsis';
  var ipc = require('ipc');

  return Backbone.Router.extend({
    routes: {
      'docs/:contents': 'contentsHandler',
      'quit': 'quitHandler',
      'external/*path': 'externalLinkHandler',
      '*actions': 'defaultHandler'
    },

    initialize: function() {
      this.current = null;

      Marked.setOptions({
        highlight: function (code) {
          return Hljs.highlightAuto(code).value;
        }
      });

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
        },
        error:function() {
          Nprogress.done();
          alert('읽을 수 없는 문서나 링크입니다.')
        }
      });
    },

    contentsRenderer: function(doc) {
      var match, customRenderer = new Marked.Renderer();

      customRenderer.link = function(href, title, text) {
        var protocol = /.+(?=:\/)/.exec(href);

        if(protocol == null) {
          // 네비게이션 링크의 컨텐츠명 추출
          match = /[\w+\-]+(?=\.md)/g.exec(href);
          return match == null ?
            Handlebars.compile('<span>{{text}}</span>')({ text: text }) :
            Handlebars.compile('<a href="#docs/{{link}}">{{text}}</a>')({ link: match[0], text: text });
        } else {
          switch(protocol[0]) {
          case 'tutorial':
            return Handlebars.compile('<button data-role="tutorial" data-command="{{cid}}" class="btn btn-default glyphicon glyphicon-play"></button>')({ cid: href.split('://')[1] });
            break;
          default:
            return Handlebars.compile('<a href="#external/{{link}}">{{text}}</a>')({ link: href, text: text });
            break;
          }
        }
      }

      Backbone.$('.main')[0].innerHTML = Marked(doc, { renderer: customRenderer });
      Nprogress.done();
    },

    contentsHandler: function(contents) {
      this.toogleMenu(contents);
      this.contentsLoader(contents)
        .done(this.contentsRenderer)
        .always(function() {
          var commandControls = document.querySelectorAll('button[data-role="tutorial"]');
          var ipc = require('ipc');

          window.scrollTo(0, 0);

          _.each(commandControls, function(c) {
            c.addEventListener('click', function(event) {
              ipc.send(event.target.dataset.command);
            });
          });
        });
    },

    externalLinkHandler: function(link) {
      window.open(link);
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
