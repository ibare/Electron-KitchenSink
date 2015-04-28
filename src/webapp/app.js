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
      var customRenderer = new Marked.Renderer();

      customRenderer.link = function(href, title, text) {
        var protocol = /.+(?=:\/)/.exec(href);

        if(protocol == null) {
          return Handlebars.compile('<a href="#external/{{link}}">{{text}}</a>')({ link: href, text: text });
        } else {
          switch(protocol[0]) {
          case 'tutorial':
            var cid = href.split('://')[1];
            return Handlebars.compile('<button data-role="tutorial" data-command="{{cid}}" class="btn btn-default glyphicon glyphicon-play"></button>')({ cid: cid });
            break;
          default:
            // 네비게이션 링크의 컨텐츠명 추출
            var match = /[\w+\-]+\.md/g.exec(href);
            return match == null ?
              Handlebars.compile('<span>{{text}}</span>')({ text: text }) :
              Handlebars.compile('<a href="#docs/{{link}}">{{text}}</a>')({ link: match[0].replace('.md', ''), text: text });
            break;
          }
        }
      }

      Backbone.$('.main')[0].innerHTML = Marked(doc, { renderer: customRenderer });
      Nprogress.done();

      console.log('renderer');
    },

    contentsHandler: function(contents) {
      this.toogleMenu(contents);
      this.contentsLoader(contents)
        .done(this.contentsRenderer)
        .always(function() {
          var commandControls = document.querySelectorAll('button[data-role="tutorial"]');

          _.each(commandControls, function(c) {
            c.addEventListener('click', function(event) {
              var ipc = require('ipc');

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
