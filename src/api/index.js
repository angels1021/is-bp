/*
* API
*
* api - here we normalize responses and errors,
* in order to provide a unified api for the whole app
*
*/

import { get, post } from '../utils/request';

// user
export const getUser = (id) => get(`/users/${id}`);

export const getUsers = (queryParams) => get('/users', { data: queryParams });

export const userLlogin = ({ username, password, code = '' }) => (
  post('/login', { data: { username, password, code } })
);

export const userLogout = (userId) => post('/logout', {
  data: { userId }
});

export const userRegister = ({ username, password }) => post('/register', {
  data: { username, password }
});

// locale
export const getLocale = (locale, modulePath) => get(`/locale/${locale}`, { data: { modulePath } });

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
