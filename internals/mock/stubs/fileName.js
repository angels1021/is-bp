/*
* File stub
*
* stub to return a required a non js file's name for tests
* meant to be used for images.
* see https://facebook.github.io/jest/docs/webpack.html
* */

import path from 'path';

export default {
  process(filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  }
};
