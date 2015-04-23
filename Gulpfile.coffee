path    = require 'path'
gulp    = require 'gulp'
watch   = require 'gulp-watch'
sass    = require 'gulp-sass'
shell   = require 'gulp-shell'
notify  = require 'gulp-notify'

config =
  path:
    source:
      bower: 'bower_components',
      html: 'src/html',
      sass: 'src/sass',
      asset: 'src/asset',
      appinfo: 'src/appinfo',
      backend: 'src/backend'
    target:
      root: 'build',
      library:
        js: 'build/lib/js',
        css: 'build/lib/css'
      static:
        html: 'build/',
        css: 'build/css',
        js: 'build/js',
        fonts: 'build/fonts'

fullpath =
  sass: path.join(config.path.source.sass, '**/*.scss'),
  html: path.join(config.path.source.html, '**/*.html')

gulp.task 'compile-sass', ->
  gulp.src fullpath.sass
    .pipe sass style: 'compressed'
    .pipe gulp.dest path.join config.path.target.static.css

gulp.task 'deploy-library-files', ->
  gulp.src [
        path.join(config.path.source.bower, 'requirejs/require.js'),
        path.join(config.path.source.bower, 'jquery/dist/jquery.min.js'),
        path.join(config.path.source.bower, 'underscore/underscore.js'),
        path.join(config.path.source.bower, 'backbone/backbone.js'),
        path.join(config.path.source.bower, 'bootstrap/dist/js/bootstrap.min.js'),
        path.join(config.path.source.bower, 'handlebars/handlebars.min.js')
      ]
    .pipe gulp.dest config.path.target.library.js

  gulp.src [
        path.join(config.path.source.bower, 'bootstrap/dist/css/bootstrap.min.css'),
        path.join(config.path.source.bower, 'bootstrap/dist/css/bootstrap-theme.min.css')
      ]
    .pipe gulp.dest config.path.target.library.css

  gulp.src path.join config.path.source.bower, 'bootstrap/dist/fonts/*.*'
    .pipe gulp.dest config.path.target.static.fonts

gulp.task 'deploy-static-files', ->
  gulp.src [fullpath.html]
    .pipe gulp.dest config.path.target.root

gulp.task 'deploy-appinfo', ->
  gulp.src path.join config.path.source.appinfo, 'package.json'
    .pipe gulp.dest config.path.target.root

gulp.task 'deploy-backend', ->
  gulp.src path.join config.path.source.backend, '**/*.js'
    .pipe gulp.dest config.path.target.root

gulp.task 'watch', ->
  gulp.watch fullpath.sass, -> gulp.start 'compile-sass'
  gulp.watch fullpath.html, -> gulp.start 'deploy-static-files'

gulp.task 'build', ->
  gulp.start [
    'deploy-appinfo',
    'deploy-static-files',
    'deploy-backend',
    'compile-sass',
    'deploy-library-files'
  ]

gulp.task 'run', ->
  gulp.start shell.task ['electron ' + path.join config.path.target.root]

gulp.task 'default', ['build']
