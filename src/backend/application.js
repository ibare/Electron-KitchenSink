'use strict'
var app = require('app');
var AppInfo = require('./package.json');
var BrowserWindow = require('browser-window');
var CrashReporter = require('crash-reporter');
var mainWindow = null;

CrashReporter.start()

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: AppInfo.window.width,
    height: AppInfo.window.height,
    frame: AppInfo.window.frame
  });

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
