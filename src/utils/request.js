import 'whatwg-fetch';
import { isPlainObject, isArray, isBoolean, isUndefined } from 'lodash-es';
import { invariant } from './invariant';

/**
 * Sets the default request url by environment.
 * */
const apiUrl = (process.env.NODE_ENV === 'production')
  ? 'http://jsonplaceholder.typicode.com'
  : 'http://localhost:3001';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
const parseJSON = (response) => response.json();

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch" options here are pure Request options. (optional)
 *
 * @return {object}           The response data
 */
const request = (url, options) => (
  fetch(`${apiUrl}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((response) => ({ response }))
    .catch((error) => ({ error }))
);

export default request;

/**
 * toQueryString - create query strings from data objects
 *
 * @param {object} params - a map of key value pairs, to convert to queries
 *
 * @returns {string} the constructed query string
 */
const toQueryString = (params) => Object.keys(params)
  .reduce((query, key) => {
    const val = params[key];
    if (isUndefined(val)) return query;
    const prefix = query ? '&' : '';
    const stringVal = isArray(val) || isPlainObject(val) ? JSON.stringify(val) : val;
    return `${query}${prefix}${encodeURIComponent(key)}=${encodeURIComponent(stringVal)}`;
  }, '');


const defaultOptions = {
  data: {},
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * nornalizeData - construct the 'fetch' options object
 * from our simplyfied request options.
 *
 * @param {object}  options           request options
 * @param {object}  options.data      the request body or query (as an object).
 *                                    any valid Request.body value is valid here.
 *                                    see https://developer.mozilla.org/en-US/docs/Web/API/Body
 * @param {object}  options.headers   request headers option
 *                                    any valid Request.Headers value is valid here
 *                                    see https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers
 * @param {string}    caller          the request method. 'GET', 'POST'....
 * @param {boolean} [withQuery=false] should the options data be converted to a query string?
 *
 * @returns {object} the normalized options object which can be passed directley to 'fetch'
 */
const nornalizeData = (options, caller, withQuery = false) => {
  const opts = { ...defaultOptions, ...options };
  const { data, headers: headersOpts, method, ...rest } = opts;
  invariant(
    isUndefined(method),
    `method option ${method} passed to specific ${caller} request. please use 'request' function to declare full fetch options`
  );
  const stringify = !withQuery && (isPlainObject(data) || isArray(data) || isBoolean(data));
  const asQuery = (withQuery && isPlainObject(data)) ? toQueryString(data) : data;
  const asBody = stringify ? JSON.stringify(data) : data;
  const body = withQuery ? asQuery : asBody;
  const headers = new Headers(headersOpts);
  return { method: caller, body, headers, ...rest };
};

/**
* post - POST request shortcut
*
* @param {string} url     request url
* @param {object} options the request options. see nornalizeData for possible options
*
* @returns {Promise} the fetch request promise.
*/
export const post = (url, options) => request(url, nornalizeData(options, 'POST'));

/**
* post - put request shortcut
*
* @param {string} url     request url
* @param {object} options the request options. see nornalizeData for possible options
*
* @returns {Promise} the fetch request promise.
*/
export const put = (url, options) => request(url, nornalizeData(options, 'PUT'));

/**
* post - DELETE request shortcut (short name cause delete is a reserved word)
*
* @param {string} url     request url
* @param {object} options the request options. see nornalizeData for possible options
*
* @returns {Promise} the fetch request promise.
*/
export const del = (url, options) => request(url, nornalizeData(options, 'DELETE'));

/**
* post - get request shortcut
* since default Request options are set to 'GET', options here are optional.
* if ommitted, 'request(url)' will be called directley. data will be assumed to be in url.
*
* @param {string} url     request url
* @param {object} [options=false] the request options. see nornalizeData for possible options
*
* @returns {Promise} the fetch request promise.
*/
export const get = (url, options = false) => {
  if (!options) return request(url);
  const { body, ...rest } = nornalizeData(options, 'GET', true);
  const withQuery = body ? `${url}?${body}` : url;
  return request(withQuery, { ...rest });
};
