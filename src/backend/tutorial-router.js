var BrowserWindow = require('browser-window');
var ipc = require('ipc');

module = module.exports = {
  onFrameless: function(event, args) {
    var framelessWindow = new BrowserWindow({
      width: 500,
      height: 500,
      frame: false
    });

    framelessWindow.loadUrl('file://'+__dirname+'/tutorial/frameless.html');
    framelessWindow.on('closed', function() {
      framelessWindow = null;
    });

    ipc.on('closeFrameless', function(event, args) {
      !framelessWindow || framelessWindow.close();
    });
  },

  onTransparent: function(event, args) {
    var transparentWindow = new BrowserWindow({
      width: 500,
      height: 500,
      transparent: true,
      frame: false
    });

    transparentWindow.loadUrl('file://'+__dirname+'/tutorial/transparent.html');

    transparentWindow.on('closed', function() {
      transparentWindow = null;
    });

    ipc.on('closeTransparent', function(event, args) {
      !transparentWindow || transparentWindow.close();
    });
  },

  onOpenFileDialog: function(event, args) {
    var dialog = require('dialog');
    var files = dialog.showOpenDialog({
      properties: [ 'openFile', 'openDirectory', 'multiSelections' ]
    });
  },

  onWriteClipboard: function(event, args) {
    var dialog = require('dialog');
    var clipboard = require('clipboard');

    clipboard.writeText('Example String');
  }
};
