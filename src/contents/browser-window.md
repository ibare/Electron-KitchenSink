# browser-window

The `BrowserWindow` class gives you ability to create a browser window, an
example is:

```javascript
var BrowserWindow = require('browser-window');

var win = new BrowserWindow({ width: 800, height: 600, show: false });
win.on('closed', function() {
  win = null;
});

win.loadUrl('https://github.com');
win.show();
```

You can also create a window without chrome by using
[Frameless Window](frameless-window.md) API.

## Class: BrowserWindow

`BrowserWindow` is an
[EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

### new BrowserWindow(options)

* `options` Object
  * `x` Integer - Window's left offset to screen
  * `y` Integer - Window's top offset to screen
  * `width` Integer - Window's width
  * `height` Integer - Window's height
  * `use-content-size` Boolean - The `width` and `height` would be used as web
     page's size, which means the actual window's size will include window
     frame's size and be slightly larger.
  * `center` Boolean - Show window in the center of the screen
  * `min-width` Integer - Minimum width
  * `min-height` Integer - Minimum height
  * `max-width` Integer - Maximum width
  * `max-height` Integer - Maximum height
  * `resizable` Boolean - Whether window is resizable
  * `always-on-top` Boolean - Whether the window should always stay on top of
     other windows
  * `fullscreen` Boolean - Whether the window should show in fullscreen, when
    set to `false` the fullscreen button would also be hidden on OS X
  * `skip-taskbar` Boolean - Do not show window in Taskbar
  * `zoom-factor` Number - The default zoom factor of the page, zoom factor is
    zoom percent / 100, so `3.0` represents `300%`
  * `kiosk` Boolean - The kiosk mode
  * `title` String - Default window title
  * `icon` [NativeImage](native-image.md) - The window icon, when omitted on
    Windows the executable's icon would be used as window icon
  * `show` Boolean - Whether window should be shown when created
  * `frame` Boolean - Specify `false` to create a
    [Frameless Window](frameless-window.md)
  * `node-integration` Boolean - Whether node integration is enabled, default
     is `true`
  * `accept-first-mouse` Boolean - Whether the web view accepts a single
     mouse-down event that simultaneously activates the window
  * `auto-hide-menu-bar` Boolean - Auto hide the menu bar unless the `Alt`
    key is pressed.
  * `enable-larger-than-screen` Boolean - Enable the window to be resized larger
    than screen.
  * `dark-theme` Boolean - Forces using dark theme for the window, only works on
    some GTK+3 desktop environments
  * `preload` String - Specifies a script that will be loaded before other
    scripts run in the window. This script will always have access to node APIs
    no matter whether node integration is turned on for the window, and the path
    of `preload` script has to be absolute path.
  * `transparent` Boolean - Makes the window [transparent](frameless-window.md)
  * `type` String - Specifies the type of the window, possible types are
    `desktop`, `dock`, `toolbar`, `splash`, `notification`. This only works on
    Linux.
  * `web-preferences` Object - Settings of web page's features
    * `javascript` Boolean
    * `web-security` Boolean
    * `images` Boolean
    * `java` Boolean
    * `text-areas-are-resizable` Boolean
    * `webgl` Boolean
    * `webaudio` Boolean
    * `plugins` Boolean - Whether plugins should be enabled, currently only
      `NPAPI` plugins are supported.
    * `extra-plugin-dirs` Array - Array of paths that would be searched for
      plugins. Note that if you want to add a directory under your app, you
      should use `__dirname` or `process.resourcesPath` to join the paths to
      make them absolute, using relative paths would make Electron search
      under current working directory.
    * `experimental-features` Boolean
    * `experimental-canvas-features` Boolean
    * `subpixel-font-scaling` Boolean
    * `overlay-scrollbars` Boolean
    * `overlay-fullscreen-video` Boolean
    * `shared-worker` Boolean
    * `direct-write` Boolean - Whether the DirectWrite font rendering system on
       Windows is enabled

Creates a new `BrowserWindow` with native properties set by the `options`.
Usually you only need to set the `width` and `height`, other properties will
have decent default values.

### Event: 'page-title-updated'

* `event` Event

Emitted when the document changed its title, calling `event.preventDefault()`
would prevent the native window's title to change.

### Event: 'close'

* `event` Event

Emitted when the window is going to be closed. It's emitted before the
`beforeunload` and `unload` event of DOM, calling `event.preventDefault()`
would cancel the close.

Usually you would want to use the `beforeunload` handler to decide whether the
window should be closed, which will also be called when the window is
reloaded. In Electron, returning an empty string or `false` would cancel the
close. An example is:

```javascript
window.onbeforeunload = function(e) {
  console.log('I do not want to be closed');

  // Unlike usual browsers, in which a string should be returned and the user is
  // prompted to confirm the page unload. Electron gives the power completely
  // to the developers, return empty string or false would prevent the unloading
  // now. You can also use the dialog API to let user confirm it.
  return false;
};
```

### Event: 'closed'

Emitted when the window is closed. After you have received this event you should
remove the reference to the window and avoid using it anymore.

### Event: 'unresponsive'

Emitted when the web page becomes unresponsive.

### Event: 'responsive'

Emitted when the unresponsive web page becomes responsive again.

### Event: 'blur'

Emitted when window loses focus.

### Event: 'focus'

Emitted when window gains focus.

### Event: 'maximize'

Emitted when window is maximized.

### Event: 'unmaximize'

Emitted when window exits from maximized state.

### Event: 'minimize'

Emitted when window is minimized.

### Event: 'restore'

Emitted when window is restored from minimized state.

### Event: 'enter-full-screen'

Emitted when window enters full screen state.

### Event: 'leave-full-screen'

Emitted when window leaves full screen state.

### Event: 'devtools-opened'

Emitted when devtools is opened.

### Event: 'devtools-closed'

Emitted when devtools is closed.

### Event: 'devtools-focused'

Emitted when devtools is focused / opened.

### Class Method: BrowserWindow.getAllWindows()

Returns an array of all opened browser windows.

### Class Method: BrowserWindow.getFocusedWindow()

Returns the window that is focused in this application.

### Class Method: BrowserWindow.fromWebContents(webContents)

* `webContents` WebContents

Find a window according to the `webContents` it owns

### Class Method: BrowserWindow.fromId(id)

* `id` Integer

Find a window according to its ID.

### Class Method: BrowserWindow.addDevToolsExtension(path)

* `path` String

Adds devtools extension located at `path`, and returns extension's name.

The extension will be remembered so you only need to call this API once, this
API is not for programming use.

### Class Method: BrowserWindow.removeDevToolsExtension(name)

* `name` String

Remove the devtools extension whose name is `name`.

### BrowserWindow.webContents

The `WebContents` object this window owns, all web page related events and
operations would be done via it.

**Note:** Users should never store this object because it may become `null`
when the renderer process (web page) has crashed.

### BrowserWindow.devToolsWebContents

Get the `WebContents` of devtools of this window.

**Note:** Users should never store this object because it may become `null`
when the devtools has been closed.

### BrowserWindow.id

Get the unique ID of this window.

### BrowserWindow.destroy()

Force closing the window, the `unload` and `beforeunload` event won't be emitted
for the web page, and `close` event would also not be emitted
for this window, but it would guarantee the `closed` event to be emitted.

You should only use this method when the renderer process (web page) has crashed.

### BrowserWindow.close()

Try to close the window, this has the same effect with user manually clicking
the close button of the window. The web page may cancel the close though, see
the [close event](#event-close).

### BrowserWindow.focus()

Focus on the window.

### BrowserWindow.isFocused()

Returns whether the window is focused.

### BrowserWindow.show()

Shows and gives focus to the window.

### BrowserWindow.showInactive()

Shows the window but doesn't focus on it.

### BrowserWindow.hide()

Hides the window.

### BrowserWindow.isVisible()

Returns whether the window is visible to the user.

### BrowserWindow.maximize()

Maximizes the window.

### BrowserWindow.unmaximize()

Unmaximizes the window.

### BrowserWindow.isMaximized()

Returns whether the window is maximized.

### BrowserWindow.minimize()

Minimizes the window. On some platforms the minimized window will be shown in
the Dock.

### BrowserWindow.restore()

Restores the window from minimized state to its previous state.

### BrowserWindow.isMinimized()

Returns whether the window is minimized.

### BrowserWindow.setFullScreen(flag)

* `flag` Boolean

Sets whether the window should be in fullscreen mode.

### BrowserWindow.isFullScreen()

Returns whether the window is in fullscreen mode.

### BrowserWindow.setSize(width, height)

* `width` Integer
* `height` Integer

Resizes the window to `width` and `height`.

### BrowserWindow.getSize()

Returns an array that contains window's width and height.

### BrowserWindow.setContentSize(width, height)

* `width` Integer
* `height` Integer

Resizes the window's client area (e.g. the web page) to `width` and `height`.

### BrowserWindow.getContentSize()

Returns an array that contains window's client area's width and height.

### BrowserWindow.setMinimumSize(width, height)

* `width` Integer
* `height` Integer

Sets the minimum size of window to `width` and `height`.

### BrowserWindow.getMinimumSize()

Returns an array that contains window's minimum width and height.

### BrowserWindow.setMaximumSize(width, height)

* `width` Integer
* `height` Integer

Sets the maximum size of window to `width` and `height`.

### BrowserWindow.getMaximumSize()

Returns an array that contains window's maximum width and height.

### BrowserWindow.setResizable(resizable)

* `resizable` Boolean

Sets whether the window can be manually resized by user.

### BrowserWindow.isResizable()

Returns whether the window can be manually resized by user.

### BrowserWindow.setAlwaysOnTop(flag)

* `flag` Boolean

Sets whether the window should show always on top of other windows. After
setting this, the window is still a normal window, not a toolbox window which
can not be focused on.

### BrowserWindow.isAlwaysOnTop()

Returns whether the window is always on top of other windows.

### BrowserWindow.center()

Moves window to the center of the screen.

### BrowserWindow.setPosition(x, y)

* `x` Integer
* `y` Integer

Moves window to `x` and `y`.

### BrowserWindow.getPosition()

Returns an array that contains window's current position.

### BrowserWindow.setTitle(title)

* `title` String

Changes the title of native window to `title`.

### BrowserWindow.getTitle()

Returns the title of the native window.

**Note:** The title of web page can be different from the title of the native
window.

### BrowserWindow.flashFrame(flag)

* `flag` Boolean

Starts or stops flashing the window to attract user's attention.

### BrowserWindow.setSkipTaskbar(skip)

* `skip` Boolean

Makes the window do not show in Taskbar.

### BrowserWindow.setKiosk(flag)

* `flag` Boolean

Enters or leaves the kiosk mode.

### BrowserWindow.isKiosk()

Returns whether the window is in kiosk mode.

### BrowserWindow.setRepresentedFilename(filename)

* `filename` String

Sets the pathname of the file the window represents, and the icon of the file
will show in window's title bar.

__Note__: This API is available only on OS X.

### BrowserWindow.getRepresentedFilename()

Returns the pathname of the file the window represents.

__Note__: This API is available only on OS X.

### BrowserWindow.setDocumentEdited(edited)

* `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title
bar will become grey when set to `true`.

__Note__: This API is available only on OS X.

### BrowserWindow.IsDocumentEdited()

Whether the window's document has been edited.

__Note__: This API is available only on OS X.

### BrowserWindow.openDevTools([options])

* `options` Object
  * `detach` Boolean - opens devtools in a new window

Opens the developer tools.

### BrowserWindow.closeDevTools()

Closes the developer tools.

### BrowserWindow.toggleDevTools()

Toggle the developer tools.

### BrowserWindow.inspectElement(x, y)

* `x` Integer
* `y` Integer

Starts inspecting element at position (`x`, `y`).

### BrowserWindow.focusOnWebView()

### BrowserWindow.blurWebView()

### BrowserWindow.capturePage([rect, ]callback)

* `rect` Object - The area of page to be captured
  * `x` Integer
  * `y` Integer
  * `width` Integer
  * `height` Integer
* `callback` Function

Captures the snapshot of page within `rect`, upon completion `callback` would be
called with `callback(image)`, the `image` is an instance of
[NativeImage](native-image.md) that stores data of the snapshot. Omitting the
`rect` would capture the whole visible page.

**Note:** Be sure to read documents on remote buffer in
[remote](remote.md) if you are going to use this API in renderer
process.

### BrowserWindow.print([options])

* `options` Object
  * `silent` Boolean - Don't ask user for print settings, defaults to `false`
  * `printBackground` Boolean - Also prints the background color and image of
    the web page, defaults to `false`.

Prints window's web page. When `silent` is set to `false`, Electron will pick
up system's default printer and default settings for printing.

Calling `window.print()` in web page is equivalent to call
`BrowserWindow.print({silent: false, printBackground: false})`.

### BrowserWindow.loadUrl(url)

Same with `webContents.loadUrl(url)`.

### BrowserWindow.reload()

Same with `webContents.reload`.

### BrowserWindow.setMenu(menu)

* `menu` Menu

Sets the `menu` as the window top menu.

__Note:__ This API is not available on OS X.

### BrowserWindow.setProgressBar(progress)

* `progress` Double

Sets progress value in progress bar. Valid range is [0, 1.0].

Remove progress bar when progress < 0;
Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify
the `*.desktop` file name to `desktopName` field in `package.json`. By default,
it will assume `app.getName().desktop`.

### BrowserWindow.setOverlayIcon(overlay, description)

* `overlay` [NativeImage](native-image.md) - the icon to display on the bottom
right corner of the Taskbar icon. If this parameter is `null`, the overlay is
cleared
* `description` String - a description that will be provided to Accessibility
screen readers

Sets a 16px overlay onto the current Taskbar icon, usually used to convey some sort of application status or to passively notify the user.

__Note:__ This API is only available on Windows, Win7 or above

### BrowserWindow.showDefinitionForSelection()

Shows pop-up dictionary that searches the selected word on the page.

__Note__: This API is available only on OS X.

### BrowserWindow.setAutoHideMenuBar(hide)

* `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the
menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't
hide it immediately.

### BrowserWindow.isMenuBarAutoHide()

Returns whether menu bar automatically hides itself.

### BrowserWindow.setMenuBarVisibility(visible)

* `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users
can still bring up the menu bar by pressing the single `Alt` key.

### BrowserWindow.isMenuBarVisible()

Returns whether the menu bar is visible.

### BrowserWindow.setVisibleOnAllWorkspaces(visible)

* `visible` Boolean

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

### BrowserWindow.isVisibleOnAllWorkspaces()

Returns whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

## Class: WebContents

A `WebContents` is responsible for rendering and controlling a web page.

`WebContents` is an
[EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

### Event: 'did-finish-load'

Emitted when the navigation is done, i.e. the spinner of the tab will stop
spinning, and the `onload` event was dispatched.

### Event: 'did-fail-load'

* `event` Event
* `errorCode` Integer
* `errorDescription` String

This event is like `did-finish-load`, but emitted when the load failed or was
cancelled, e.g. `window.stop()` is invoked.

### Event: 'did-frame-finish-load'

* `event` Event
* `isMainFrame` Boolean

Emitted when a frame has done navigation.

### Event: 'did-start-loading'

Corresponds to the points in time when the spinner of the tab starts spinning.

### Event: 'did-stop-loading'

Corresponds to the points in time when the spinner of the tab stops spinning.

### Event: 'did-get-response-details'

* `event` Event
* `status` Boolean
* `newUrl` String
* `originalUrl` String
* `httpResponseCode` Integer
* `requestMethod` String
* `referrer` String

Emitted when details regarding a requested resource is available.
`status` indicates the socket connection to download the resource.

### Event: 'did-get-redirect-request'

* `event` Event
* `oldUrl` String
* `newUrl` String
* `isMainFrame` Boolean

Emitted when a redirect was received while requesting a resource.

### Event: 'new-window'

* `event` Event
* `url` String
* `frameName` String
* `disposition` String - Can be `default`, `foreground-tab`, `background-tab`,
  `new-window` and `other`

Emitted when the page requested to open a new window for `url`. It could be
requested by `window.open` or an external link like `<a target='_blank'>`.

By default a new `BrowserWindow` will be created for the `url`.

Calling `event.preventDefault()` can prevent creating new windows.

### Event: 'will-navigate'

* `event` Event
* `url` String

Emitted when user or the page wants to start an navigation, it can happen when
`window.location` object is changed or user clicks a link in the page.

This event will not emit when the navigation is started programmely with APIs
like `WebContents.loadUrl` and `WebContents.back`.

Calling `event.preventDefault()` can prevent the navigation.

### Event: 'crashed'

Emitted when the renderer process is crashed.

### Event: 'destroyed'

Emitted when the WebContents is destroyed.

### WebContents.loadUrl(url)

* `url` URL

Loads the `url` in the window, the `url` must contains the protocol prefix,
e.g. the `http://` or `file://`.

### WebContents.getUrl()

Returns URL of current web page.

### WebContents.getTitle()

Returns the title of web page.

### WebContents.isLoading()

Returns whether web page is still loading resources.

### WebContents.isWaitingForResponse()

Returns whether web page is waiting for a first-response for the main resource
of the page.

### WebContents.stop()

Stops any pending navigation.

### WebContents.reload()

Reloads current page.

### WebContents.reloadIgnoringCache()

Reloads current page and ignores cache.

### WebContents.canGoBack()

Returns whether the web page can go back.

### WebContents.canGoForward()

Returns whether the web page can go forward.

### WebContents.canGoToOffset(offset)

* `offset` Integer

Returns whether the web page can go to `offset`.

### WebContents.goBack()

Makes the web page go back.

### WebContents.goForward()

Makes the web page go forward.

### WebContents.goToIndex(index)

* `index` Integer

Navigates to the specified absolute index.

### WebContents.goToOffset(offset)

* `offset` Integer

Navigates to the specified offset from the "current entry".

### WebContents.isCrashed()

Whether the renderer process has crashed.

### WebContents.setUserAgent(userAgent)

* `userAgent` String

Overrides the user agent for this page.

### WebContents.insertCSS(css)

* `css` String

Injects CSS into this page.

### WebContents.executeJavaScript(code)

* `code` String

Evaluates `code` in page.

### WebContents.undo()

Executes editing command `undo` in page.

### WebContents.redo()

Executes editing command `redo` in page.

### WebContents.cut()

Executes editing command `cut` in page.

### WebContents.copy()

Executes editing command `copy` in page.

### WebContents.paste()

Executes editing command `paste` in page.

### WebContents.delete()

Executes editing command `delete` in page.

### WebContents.selectAll()

Executes editing command `selectAll` in page.

### WebContents.unselect()

Executes editing command `unselect` in page.

### WebContents.replace(text)

* `text` String

Executes editing command `replace` in page.

### WebContents.replaceMisspelling(text)

* `text` String

Executes editing command `replaceMisspelling` in page.

### WebContents.send(channel[, args...])

* `channel` String

Send `args..` to the web page via `channel` in asynchronous message, the web
page can handle it by listening to the `channel` event of `ipc` module.

An example of sending messages from the main process to the renderer process:

```javascript
// On the main process.
var window = null;
app.on('ready', function() {
  window = new BrowserWindow({width: 800, height: 600});
  window.loadUrl('file://' + __dirname + '/index.html');
  window.webContents.on('did-finish-load', function() {
    window.webContents.send('ping', 'whoooooooh!');
  });
});
```

```html
// index.html
<html>
<body>
  <script>
    require('ipc').on('ping', function(message) {
      console.log(message);  // Prints "whoooooooh!"
    });
  </script>
</body>
</html>
```

**Note:**

1. The IPC message handler in web pages do not have a `event` parameter, which
   is different from the handlers on the main process.
2. There is no way to send synchronous messages from the main process to a
   renderer process, because it would be very easy to cause dead locks.
