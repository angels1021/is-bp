require('babel-register');
const path = require('path');
const createCacheKeyFunction = require('fbjs-scripts/jest/createCacheKeyFunction');
const extractMessages = require('../../translations/extractMessages.js').default;
module.exports = {
  process(src, filePath) {
    const messages = require(filePath).default; // eslint-disable-line global-require
    return `module.exports = ${JSON.stringify(extractMessages(messages, 'id'))}`;
  },
  getCacheKey: createCacheKeyFunction([
    __filename,
    path.resolve(__dirname, '../../translations/extractMessages.js')
  ]),
  canInstrument: true
};

