process.env.NODE_ENV = 'test';

/* eslint-disable import/no-extraneous-dependencies */

require('babel-register')();

//disable webpack specific features

require.extensions['.scss'] = function () { return null; };
require.extensions['.png'] = function () { return null; };
require.extensions['.jpg'] = function () { return null; };

//configure jsDom
const jsdom = require('jsdom').jsdom;

//set globals
const exposeProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposeProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;  //eslint-disable-line no-undef
