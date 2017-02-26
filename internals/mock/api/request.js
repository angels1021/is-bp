/*
* json server internal api calls
*/
import fetch from 'node-fetch';
import { isUndefined } from 'lodash';

/**
 * Sets the default request url by environment.
 * */
const apiUrl = 'http://localhost:3001';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(`${apiUrl}${url}`, options)
    .then(checkStatus)
    .then(parseJSON);
}

const normalize = (method, data) => ({
  method,
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json'
  }
});

const toQueryString = (params) => Object.keys(params)
  .reduce((query, key) => {
    const val = params[key];
    if (isUndefined(val)) return query;
    const prefix = query ? '&' : '';
    return `${query}${prefix}${key}=${val}`;
  }, '');

export const get = (url, data) => request(`${url}${data ? '?' : ''}${data ? toQueryString(data) : ''}`);
export const post = (url, data) => request(url, normalize('POST', data));
export const put = (url, data) => request(url, normalize('PUT', data));
export const del = (url, data) => request(url, normalize('DEL', data));
