/*
*  Loader to convert translation messages json
*  to simple key:value objects
* */

import { getLoaderConfig } from 'loader-utils';
import extractMessages from '../../translations/extractMessages';

module.exports.pitch = function messageExtractLoader() {
  this.cacheable && this.cacheable(); // eslint-disable-line no-unused-expressions
  const messages = require(this.resourcePath); // eslint-disable-line global-require
  const { filter } = getLoaderConfig(this);
  const newMessages = extractMessages(messages.default, filter);
  return `module.exports = ${JSON.stringify(newMessages)};`;
};
