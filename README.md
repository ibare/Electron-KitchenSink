# Electron-KitchenSink
The tutorial for electron. electron and atom-shell https://github.com/atom/electron

## Dependency

```bash
$ npm install -g gulp
$ npm install -g bower
$ npm install -g electron-prebuilt
```

## Installation

```bash
$ npm install
$ bower install
```

## Build & Run

```bash
$ gulp build
$ gulp run
```

## Directory Structure

```text
Electron-KitchenSink
├── build
│   ├── css
│   ├── font
│   ├── lib
│   │   ├── css
│   │   └── js
│   ├── browser
│   ├── app.js
│   └── loader.js
├── bower_components -> build/lib/
├── src
│   ├── appinfo -> build/
│   ├── backend -> build/
│   ├── html    -> build/
│   ├── sass    -> build/css
│   ├── tools
│   └── webapp  -> build/browser
├── test
└── Gulpfile.coffee
```

## License
[MIT](LICENSE)
