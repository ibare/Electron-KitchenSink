# global-shortcut

The `global-shortcut` module can register/unregister a global keyboard shortcut
in operating system, so that you can custom the operations for various shortcuts.
Note that it is global, even the app does not get focused, it still works.

```javascript
var globalShortcut = require('global-shortcut');

// Register a 'ctrl+x' shortcut listener.
var ret = globalShortcut.register('ctrl+x', function() { console.log('ctrl+x is pressed'); })
if (!ret)
  console.log('registerion fails');

// Check whether a shortcut is registered.
console.log(globalShortcut.isRegistered('ctrl+x'));

// Unregister a shortcut.
globalShortcut.unregister('ctrl+x');

// Unregister all shortcuts.
globalShortcut.unregisterAll();
```

## globalShortcut.register(accelerator, callback)

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

Registers a global shortcut of `accelerator`, the `callback` would be called when
the registered shortcut is pressed by user.

## globalShortcut.isRegistered(accelerator)

* `accelerator` [Accelerator](accelerator.md)

Returns whether shortcut of `accelerator` is registered.

## globalShortcut.unregister(accelerator)

* `accelerator` [Accelerator](accelerator.md)

Unregisters the global shortcut of `keycode`.

## globalShortcut.unregisterAll()

Unregisters all the global shortcuts.
