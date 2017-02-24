/*
* LoginActions
*
* redux actions to describe login/register actions
*
* */

import {
  CHANGE_FORM,
  SENDING_REQUEST,
  REGISTER_REQUEST,
  REQUEST_ERROR,
  CLEAR_ERROR
} from './constants';

/**
 * Sets the form state
 *
 * @param  {object} newFormState          The new state of the form
 * @param  {string} newFormState.username The new text of the username input field of the form
 * @param  {string} newFormState.password The new text of the password input field of the form
 */
export const changeForm = (newFormState) => ({
  type: CHANGE_FORM,
  newFormState
});


/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 *
 * @param  {boolean} busy True means we're sending a request, false means we're not
 */
export const sendingRequest = (busy) => ({
  type: SENDING_REQUEST,
  busy: Boolean(busy)
});

/**
 * Tells the app we want to register a user
 * @param  {object} data          The data we're sending for registration
 * @param  {string} data.username The username of the user to register
 * @param  {string} data.password The password of the user to register
 */
export const registerRequest = (data) => ({
  type: REGISTER_REQUEST,
  data
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
