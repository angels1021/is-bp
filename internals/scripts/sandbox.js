/**
 * playground
 * test stuff
 * study
 *
 * this is not connected to the app, used for idea testing only
 */
/* eslint-disable */

import chalk from 'chalk';
import { createFormAction } from 'redux-form-saga';
import { createAction } from 'redux-actions';


const noop = () => {};
const ex = new Error('la');
const REQUEST = 'path/REQUEST';
const action = createAction(REQUEST, noop, (first) => first);
console.log('action', action('first', 'second'));
const actionError = createAction(REQUEST, ({first, second}) => ({ first, second }) , (first, third) => third);
console.log('actionError', actionError({first: ex, second:'second'}, 'third'));

//
// export const loginAction = createFormAction('api/login/LOGIN');
//
// console.log(loginAction({}, (action) => { console.log('dispatch', action.payload); }));
//
// const apiTrackActions = {
//   'API_REQUEST': { payload: params, meta: options },
//   'API_SUCCESS': { payload: response, meta: options },
//   'API_FAILURE': { payload: error, meta: options }
// };
//
// const apiFetchActions = [
//   'ALL', // : get('meta.plural?buildQuery(...payload)'),
//   'ONE', // : get('meta.single/payload.id?buildQuery(...restOfPayload)'),
//   'PUT', // : put('meta.plural, {meta.headers, body:payload}'),
//   'POST', // : post('meta.single/payload.id, {meta.headers, body:{...restOfPayload}}'),
//   'DELETE' // : del('meta.single/payload.id, {meta.headers, body:{...restOfPayload}}')
// ]
//
// function* watch() {
//   const { payload: params, meta } = take('API_ALL');
//   const { plural: path } = meta;
//   if(meta.before) {
//     yield meta.before(params, meta)
//   }
//   const { response, error } = api.get(path, params)
//   yield call(callCompleted, {response, error, meta});
// }
//
// function* callCompleted({response, error, meta}) {
//   if(error) {
//     put({ type: 'API_FAILURE', meta });
//     if(meta.fail) {
//       yield meta.fail(error, meta)
//     }
//     if(meta.finally) {
//       yield meta.finally({ error }, meta)
//     }
//     return false
//   }
//   put({ type: 'API_SUCCESS', response, meta });
//   if(meta.success) {
//     yield meta.success({ response }, meta)
//   }
//   if(meta.finally) {
//     yield meta.finally({ response }, meta)
//   }
//   return true;
// }
//
//
// const authActions =  {
//   AUTH_SET: (state, action) => state.set('isLoggedIn', action.payload)
// }
//
// const options =  {
//   before: function* authBefore(payload, meta) => {
//
//   },
//   onSuccess: function* authSuccess(response){
//     put({ type: 'AUTH_SET', payload: true });
//     put({ type: 'AUTH_SUCCESS', payload: response });
//     call(setLoggedIn(response.token));
//   },
//   fail: function* authFinally(error) {
//     put({ type: 'AUTH_Fail', error });
//   }
// }
//
// const apiActions = (options) => ({
//   'API_REQUEST': (state) => {
//     return state.set('pending', true).set('error', false);
//   },
//   'API_SUCCESS': (state, action) => {
//     const { payload: response } = action;
//     return state.set('pending', false).set(options.dataKey, response)
//   },
//   'API_FAILURE': (state, action) => {
//     const { payload: error } = action;
//     return state.set('pending', false).set('error', error);
//   }
// });
//
// const apiReducerFactory = ({
//   id = '',
//   actions,
//   dataKey
// } : options) => {
//   const allActions = { ...apiActions(options), ...actions };
//   const allState = {
//     [dataKey]: [],
//     ids: [],
//     error: false,
//     pending: false,
//     ...initialState
//   };
//   const shouldSkip = (action) => (!action.meta || action.meta.id !== id);
//   return reducerFactory(allState, allActions, shouldSkip);
// }
//
// const apiResourceFactory = ({ id, single, plural, dataKey, resolve, support, selectors }) => {
//   const actionsMap = {};
//   support.forEach((actionType) => {
//     if (apiFetchActions.find(actionType)) {
//       actionsMap[`API_${actionType}`] = [(request) => request, (meta) => ({ ...meta, actionType, id, dataKey, resolve, single, plural })];
//     }
//   });
//   const itemApi = {
//     ...selectors,
//     ...createActions(actionsMap)
//   };
// };
//
// const reducerFactory = (initialState, actions, shouldSkip) => (state = initialState, action = {}) => {
//   if(shouldSkip(action)) {return state}
//   const { type } = action;
//   if(actions[type]) {
//     return actions[type](state, action)
//   }
//   return state;
// };
//
// const apiState = {
//   sagas: () => [],
// };
// const api = {};
//
// const addApi = ({
//   initialState = {},
//   id ='',
//   single = '',
//   plural = '',
//   actions = {},
//   dataKey = 'data',
//   support = [],
//   resolve = {},
//   selectors = {}
// } : options) => {
//   apiState[id] = apiReducerFactory(options);
//   api[id] = apiResourceFactory(options);
// }
//
//
