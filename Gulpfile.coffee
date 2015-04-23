path    = require 'path'
gulp    = require 'gulp'
watch   = require 'gulp-watch'
sass    = require 'gulp-sass'
shell   = require 'gulp-shell'
notify  = require 'gulp-notify'

config =
  path:
    source:
      'bower': 'bower_components',
      'html': 'src/html',
      'sass': 'src/sass',
      'asset': 'src/asset',
      'appinfo': 'src/appinfo',
      'backend': 'src/backend'
    target:
      root: 'build',
      library:
        js: 'build/lib/js',
        css: 'build/lib/css'
      static:
        html: 'build/',
        css: 'build/css',
        js: 'build/js',

gulp.task 'deploy-static-files', ->
  gulp.src [
        path.join config.path.source.html, '**/*.html'
      ]
    .pipe gulp.dest config.path.target.root

gulp.task 'deploy-appinfo', ->
  gulp.src path.join config.path.source.appinfo, 'package.json'
    .pipe gulp.dest config.path.target.root

gulp.task 'deploy-backend', ->
  gulp.src path.join config.path.source.backend, '**/*.js'
    .pipe gulp.dest config.path.target.root

gulp.task 'build', ->
  gulp.start ['deploy-appinfo','deploy-static-files', 'deploy-backend']

gulp.task 'run', ->
  gulp.start shell.task ['electron ' + path.join config.path.target.root]

gulp.task 'default', ['build']
