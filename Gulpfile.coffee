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

fullpath =
  sass: path.join(config.path.source.sass, '**/*.scss'),
  html: path.join(config.path.source.html, '**/*.html')

gulp.task 'compile-sass', ->
  gulp.src fullpath.sass
    .pipe sass style: 'compressed'
    .pipe gulp.dest path.join config.path.target.library.css

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
  gulp.start ['deploy-appinfo','deploy-static-files', 'deploy-backend']

gulp.task 'run', ->
  gulp.start shell.task ['electron ' + path.join config.path.target.root]

gulp.task 'default', ['build']
