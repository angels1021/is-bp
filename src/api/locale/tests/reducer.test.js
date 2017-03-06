/**
 * Test locale api reducer
 */

import LocaleReducerFactory from '../reducer';
import {
  changeLocale,
  changeLocaleFail,
  changeLocaleSuccess,
  changeLocaleCancel
} from '../actions';
import { CHANGE_LOCALE_REQUEST } from '../constants';

const moduleId = 'apiTest';
const localeReducer = LocaleReducerFactory(moduleId);

describe('API locale reducer', () => {
  let state;
  const request = 'he';
  beforeEach(() => {
    state = localeReducer(undefined, {});
  });

  it('should return the initial state', () => {
    expect(state).toMatchSnapshot();
  });

  it('should return the initial state if moduleId doesn\'t match', () => {
    const result = localeReducer(state, {
      type: CHANGE_LOCALE_REQUEST,
      payload: { locale: request, moduleId: 'someOtherModule' }
    });

    expect(result).toMatchSnapshot();
  });

  describe('CHANGE_LOCALE_REQUEST', () => {
    it('should reset error and set pending to requested locale', () => {
      // assert
      const expectedResult = state
        .set('error', false)
        .set('pending', request);
      // act
      const result = localeReducer(state, changeLocale(request, [], moduleId));
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('CHANGE_LOCALE_SUCCESS', () => {
    it('should reset error  and pending and set locale to request', () => {
      // assert
      const expectedResult = state
        .set('error', false)
        .set('locale', request)
        .set('pending', false);
      // act
      const result = localeReducer(state, changeLocaleSuccess(request, moduleId));
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('CHANGE_LOCALE_FAIL', () => {
    it('should reset pending and set error to response error', () => {
      // assert
      const error = new Error('some error');
      const expectedResult = state
        .set('error', error)
        .set('pending', false);
      // act
      const result = localeReducer(state, changeLocaleFail(error, moduleId));
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('CHANGE_LOCALE_CANCEL', () => {
    it('should reset pending and error', () => {
      // assert
      const expectedResult = state
        .set('error', false)
        .set('pending', false);
      // act
      const result = localeReducer(state, changeLocaleCancel(moduleId));
      // assert
      expect(result).toEqual(expectedResult);
    });
  });
});
