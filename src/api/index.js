/*
* API
*
* api - here we normalize responses and errors,
* in order to provide a unified api for the whole app
*
*/

import request from '../utils/request';
import * as auth from '../utils/auth';

export const getUser = (id) => request(`/users/${id}`);

export const login = ({ username, password, code = '' }) => auth.login(username, password, code);

export const logout = (id) => auth.logout(id);

/*
* store
*
* loading,
* error,
*
* userData
* products, !store.products -> add reducers add sagas
* customers,
* receipts
*
* order
*
* reports
*
* */
