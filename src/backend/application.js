'use strict'
var app = require('app');
var AppInfo = require('./package.json');
var BrowserWindow = require('browser-window');
var CrashReporter = require('crash-reporter');
var ipc = require('ipc');
var dialog = require('dialog');
var tutorialRouter = require('./tutorial-router');
var mainWindow = null;

CrashReporter.start()

console.log(process.platform);

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
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

ipc.on('quit', function(event, args) {
  var answer = dialog.showMessageBox(mainWindow, {
    type: 'warning',
    buttons: ['Cancel', 'Okay'],
    message: 'Are you sure?'
  }, function(button) {
    if(button == 1) {
      mainWindow.close();
    }
  })
});

ipc.on('frameless', tutorialRouter.onFrameless);
ipc.on('transparent', tutorialRouter.onTransparent);
ipc.on('openFileDialog', tutorialRouter.onOpenFileDialog);
ipc.on('writeClipboard', tutorialRouter.onWriteClipboard);
