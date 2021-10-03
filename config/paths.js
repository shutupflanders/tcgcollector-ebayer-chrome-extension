'use strict';

const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  build_chrome: path.resolve(__dirname, '../build/chrome'),
  build_firefox: path.resolve(__dirname, '../build/firefox'),
};

module.exports = PATHS;
