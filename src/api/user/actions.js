/*
 * App Actions
 *
 * Actions change things in your application
 * Since this project uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_ERROR
} from './constants';

/**
 * Load the store products, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_PRODUCTS
 */
export const loadProducts = () => ({
  type: LOAD_PRODUCTS
});

/**
 * Dispatched when the products are loaded by the request saga
 *
 * @param products {array} the user's products
 * @param username {string} username The current username
 *
 * @return {object} An action object with a type of LOAD_PRODUCTS_SUCCESS passing the repos
 */
export const productsLoaded = ({ products, username }) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  products,
  username
});

/**
 * Dispatched when loading the products fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_PRODUCTS_ERROR passing the error
 */
export const productsLoadedError = (error) => ({
  type: LOAD_PRODUCTS_ERROR,
  error
});
