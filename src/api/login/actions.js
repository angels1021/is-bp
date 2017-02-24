/*
* LoginActions
*
* redux actions to describe login/register actions
*
* */

import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  LOGOUT,
  REQUEST_ERROR,
  CLEAR_ERROR,
  cleanForm
} from './constants';

/**
 * Sets the form state
 *
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 * @param  {string} newFormState.location The location to navigate to after login
 * @param  {string} newFormState.code     The new text of the card code input field of the form (optional)
 */
export const changeForm = (newFormState) => ({
  type: CHANGE_FORM,
  newFormState
});

/**
 * Sets the authentication state of the application
 *
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export const setAuth = (newAuthState) => ({
  type: SET_AUTH,
  newAuthState: Boolean(newAuthState)
});

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 *
 * @param  {boolean} busy True means we're currently sending a request, False means we're idle
 */
export const sendingRequest = (busy) => ({
  type: SENDING_REQUEST,
  busy: Boolean(busy)
});

/**
 * Tells the app we want to login a user
 * @param  {object} data          The data we're sending for login
 * @param  {string} data.username The username of the user to login
 * @param  {string} data.password The password of the user to login
 * @param  {string} data.location The location to navigate to after login
 * @param  {string} data.code     The card code of the user to login (optional)
 */
export const loginRequest = (data) => ({
  type: LOGIN_REQUEST,
  data: { ...cleanForm, ...data }
});

/**
 * Tells the app we want to log out a user
 */
export const logoutRequest = () => ({
  type: LOGOUT
});


/**
 * Sets the 'error' state to error received
 *
 * @param {object} error The error received when trying to make arequest
 */
export const requestError = (error) => ({
  type: REQUEST_ERROR,
  error
});

/**
 * Sets the 'error' state as empty
 */
export const clearError = () => ({
  type: CLEAR_ERROR
});
