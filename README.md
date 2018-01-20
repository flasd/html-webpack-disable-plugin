# html-webpack-disable-plugin
Disables html-webpack-plugin from emiting a file :satisfied:

[![Build Status](https://travis-ci.org/flasd/html-webpack-disable-plugin.svg?branch=master)](https://travis-ci.org/flasd/html-webpack-disable-plugin) [![Coverage Status](https://coveralls.io/repos/github/flasd/html-webpack-disable-plugin/badge.svg?branch=master)](https://coveralls.io/github/flasd/html-webpack-disable-plugin?branch=master) [![npm version](https://badge.fury.io/js/html-webpack-disable-plugin.svg)](https://www.npmjs.com/package/html-webpack-disable-plugin) 

Installation
------------

You must be running Webpack on Node 4.x or higher.
The plugin is available via npm:
```shell
$ npm install  html-webpack-disable-plugin --save-dev
```

Basic Usage
-----------
Whenever you wish to supress the html-webpack-plugin from emmiting a html file, just add this plugin into your plugins list and boom. Done.
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlDisablePlugin = require('html-webpack-disable-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.join(process.cwd(), '.tmp/'),
        filename: 'emit-me-if-you-can.js',
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new HtmlDisablePlugin()
    ],
};
```

If you've liked this, consider giving it a :star:!

### Licence
MIT all the way. Let's create awesome stuff! :rocket:
