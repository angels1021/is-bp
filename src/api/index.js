import request from '../utils/request';

export const getUser = () => request('/user');

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
