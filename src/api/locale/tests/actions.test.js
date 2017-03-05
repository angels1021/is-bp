/**
 * Test locale api actions
 */

import {
  changeLocale,
  changeLocaleFail,
  changeLocaleSuccess,
  changeLocaleCancel
} from '../actions';
import {
  CHANGE_LOCALE_REQUEST,
  CHANGE_LOCALE_SUCCESS,
  CHANGE_LOCALE_FAIL,
  CHANGE_LOCALE_CANCEL
} from '../constants';

const moduleId = 'apiTest';


describe('API locale actions', () => {
  const locale = 'en';
  const request = [{ module: 'app', page: 'common' }];
  describe('changeLocale', () => {
    it('should return action object for CHANGE_LOCALE_REQUEST', () => {
      // assert
      const expectedResults = {
        type: CHANGE_LOCALE_REQUEST,
        payload: {
          locale: 'en',
          request: [{ module: 'app', page: 'common' }],
          moduleId
        }
      };
      // act
      const result = changeLocale(locale, request, moduleId);
      // assert
      expect(result).toEqual(expectedResults);
    });
  });

  describe('changeLocaleSuccess', () => {
    it('should return action object for CHANGE_LOCALE_SUCCESS', () => {
      // assert
      const expectedResults = {
        type: CHANGE_LOCALE_SUCCESS,
        payload: { locale: 'en', moduleId }
      };
      // act
      const result = changeLocaleSuccess(locale, moduleId);
      // assert
      expect(result).toEqual(expectedResults);
    });
  });

  describe('changeLocaleFail', () => {
    it('should return action object for CHANGE_LOCALE_FAIL', () => {
      // assert
      const error = new Error('some error');
      const expectedResults = {
        type: CHANGE_LOCALE_FAIL,
        payload: { error, moduleId }
      };
      // act
      const result = changeLocaleFail(error, moduleId);
      // assert
      expect(result).toEqual(expectedResults);
    });
  });

  describe('changeLocaleCancel', () => {
    it('should return action object for CHANGE_LOCALE_CANCEL', () => {
      // assert
      const expectedResults = {
        type: CHANGE_LOCALE_CANCEL,
        payload: { moduleId }
      };
      // act
      const result = changeLocaleCancel(moduleId);
      // assert
      expect(result).toEqual(expectedResults);
    });
  });
});
