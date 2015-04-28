path    = require 'path'
gulp    = require 'gulp'
watch   = require 'gulp-watch'
sass    = require 'gulp-sass'
shell   = require 'gulp-shell'
rename  = require 'gulp-rename'
notify  = require 'gulp-notify'

config =
  path:
    source:
      bower: 'bower_components',
      libraries: 'libraries',
      html: 'src/html',
      sass: 'src/sass',
      asset: 'src/asset',
      contents: 'src/contents',
      appinfo: 'src/appinfo',
      backend: 'src/backend',
      webapp: 'src/webapp'
    target:
      root: 'build',
      webapp: 'build/browser',
      library:
        js: 'build/lib/js',
        css: 'build/lib/css'
      static:
        html: 'build/',
        css: 'build/css',
        js: 'build/js',
        fonts: 'build/fonts',
        contents: 'build/contents'

fullpath =
  sass: path.join(config.path.source.sass, '**/*.scss'),
  html: path.join(config.path.source.html, '**/*.html'),
  contents: path.join(config.path.source.contents, '**/*.md'),
  app:
    backend: path.join(config.path.source.backend, '**/*.js'),
    web: path.join(config.path.source.webapp, '**/*.js')

utils =
  clearFileName: (name) ->
    match = /[\w\-]+((?=[\.\-]min)|(?=[\.\-]pack))/g.exec name
    return if match is null then name else match[0]

gulp.task 'compile-sass', ->
  gulp.src fullpath.sass
    .pipe sass style: 'compressed'
    .pipe gulp.dest path.join config.path.target.static.css

gulp.task 'deploy-library-files', ->
  gulp.src [
        path.join(config.path.source.bower, 'requirejs/require.js'),
        path.join(config.path.source.bower, 'jquery/dist/jquery.min.js'),
        path.join(config.path.source.bower, 'jquery/dist/jquery.min.map'),
        path.join(config.path.source.bower, 'underscore/underscore.js'),
        path.join(config.path.source.bower, 'backbone/backbone.js'),
        path.join(config.path.source.bower, 'bootstrap/dist/js/bootstrap.min.js'),
        path.join(config.path.source.bower, 'handlebars/handlebars.min.js'),
        path.join(config.path.source.bower, 'marked/marked.min.js'),
        path.join(config.path.source.bower, 'nprogress/nprogress.js'),
        path.join(config.path.source.bower, 'highlightjs/highlight.pack.js')
      ]
    .pipe rename (path) ->
      path.basename = utils.clearFileName path.basename
    .pipe gulp.dest config.path.target.library.js

  gulp.src [
        path.join(config.path.source.bower, 'bootstrap/dist/css/bootstrap.min.css'),
        path.join(config.path.source.bower, 'bootstrap/dist/css/bootstrap-theme.min.css'),
        path.join(config.path.source.bower, 'nprogress/nprogress.css'),
        path.join(config.path.source.bower, 'highlightjs/styles/sunburst.css')
      ]
    .pipe rename (path) ->
      path.basename = utils.clearFileName path.basename
    .pipe gulp.dest config.path.target.library.css

  gulp.src path.join config.path.source.bower, 'bootstrap/dist/fonts/*.*'
    .pipe gulp.dest config.path.target.static.fonts

gulp.task 'deploy-static-files', ->
  gulp.src [fullpath.html]
    .pipe gulp.dest config.path.target.root
  gulp.src [fullpath.contents]
    .pipe gulp.dest config.path.target.static.contents

gulp.task 'deploy-appinfo', ->
  gulp.src path.join config.path.source.appinfo, 'package.json'
    .pipe gulp.dest config.path.target.root

gulp.task 'deploy-backend', ->
  gulp.src path.join config.path.source.backend, '**/*.js'
    .pipe gulp.dest config.path.target.root

gulp.task 'deploy-webapp', ->
  gulp.src path.join config.path.source.webapp, '**/*.js'
    .pipe gulp.dest config.path.target.webapp

gulp.task 'watch', ->
  gulp.watch fullpath.sass, -> gulp.start 'compile-sass'
  gulp.watch fullpath.html, -> gulp.start 'deploy-static-files'
  gulp.watch fullpath.contents, -> gulp.start 'deploy-static-files'
  gulp.watch fullpath.app.backend, -> gulp.start 'deploy-backend'
  gulp.watch fullpath.app.web, -> gulp.start 'deploy-webapp'

gulp.task 'build', ->
  gulp.start [
    'deploy-appinfo',
    'deploy-static-files',
    'deploy-backend',
    'deploy-webapp',
    'compile-sass',
    'deploy-library-files'
  ]

gulp.task 'run', ->
  gulp.start shell.task ['electron ' + path.join config.path.target.root]

gulp.task 'default', ['build']
