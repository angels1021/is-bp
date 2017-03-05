/**
 * Auth route Reducers
 */
import { combineReducers } from 'redux-immutable';
import LocaleReducerFactory from 'api/locale/reducer';
import { MODULE } from './auth.messages';

const localeReducer = LocaleReducerFactory(MODULE);

const authReducers = combineReducers({
  locale: localeReducer
});

export default authReducers;
