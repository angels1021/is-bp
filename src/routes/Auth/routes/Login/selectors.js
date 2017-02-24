/**
 * Login page selectors
 */

import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form/immutable';

const formSelector = formValueSelector('login');
export const fieldsSelector = (state) => (...keys) => formSelector(state, ...keys);


export const selectField = (...fields) => createSelector(
  fieldsSelector,
  (selector) => selector(...fields)
);

