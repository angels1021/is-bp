/* eslint-disable import/no-extraneous-dependencies */

// configure jsDom
const jsdom = require('jsdom').jsdom;
const localStorage = require('mock-local-storage');

// set globals
const exposeProperties = ['window', 'navigator', 'document'];
const doc = jsdom('');
const win = doc.defaultView;
win.localStorage = localStorage;
global.document = doc;
global.window = win;
Object.keys(win).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposeProperties.push(property);
    global[property] = win[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

// documentRef = document;  //eslint-disable-line no-undef
