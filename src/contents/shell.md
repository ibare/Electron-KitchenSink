# shell

The `shell` module provides functions related to desktop integration.

An example of opening a URL in default browser:

```javascript
var shell = require('shell');
shell.openExternal('https://github.com');
```

## shell.showItemInFolder(fullPath)

* `fullPath` String

Show the given file in a file manager. If possible, select the file.

## shell.openItem(fullPath)

* `fullPath` String

Open the given file in the desktop's default manner.

## shell.openExternal(url)

* `url` String

Open the given external protocol URL in the desktop's default manner. (For
example, mailto: URLs in the default mail user agent.)

## shell.moveItemToTrash(fullPath)

* `fullPath` String

Move the given file to trash and returns boolean status for the operation.

## shell.beep()

Play the beep sound.
