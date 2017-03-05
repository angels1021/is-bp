/**
 * Test locale api sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { takeLatest, take, fork, race, put, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import watchLocaleFlow, { callGetLocale, getLocale } from '../sagas';
import { requestMessages } from '../../translations/actions';
import { MESSAGES_SUCCESS, MESSAGES_FAIL } from '../../translations/constants';
import { changeLocaleSuccess, changeLocaleFail, changeLocaleCancel } from '../actions';
import {
  CHANGE_LOCALE_REQUEST,
  CHANGE_LOCALE_CANCEL
} from '../constants';

const moduleId = 'apiTest';

describe('API locale sagas', () => {
  describe('watchLocaleFlow', () => {
    it('should take the last call to CHANGE_LOCALE_REQUEST', () => {
      // arrange
      const Generator = watchLocaleFlow();
      const expectedResult = takeLatest(CHANGE_LOCALE_REQUEST, callGetLocale);
      // act
      const result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('callGetLocale', () => {
    let Generator;
    const payload = {
      locale: 'en',
      request: [],
      moduleId
    };
    beforeEach(() => {
      // arrange
      Generator = callGetLocale(payload);
      const expectedResult = fork(getLocale, payload);
      // act
      const result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });

    it('should call getLocale then take CHANGE_LOCALE_CANCEL', () => {
      // arrange
      const expectedResult = take(CHANGE_LOCALE_CANCEL);
      // act
      const result = Generator.next(createMockTask()).value;
      // assert
      expect(result).toEqual(expectedResult);
    });

    it('should cancel the task if changeLocaleCancel is called on the same moduleId', () => {
      // arrange
      const task = createMockTask();
      const expectedResult = cancel(task);
      // act
      Generator.next(task);
      const result = Generator.next({ payload: { moduleId } }).value;
      // assert
      expect(result).toEqual(expectedResult);
    });

    it('should ignore if changeLocaleCancel is called on a different moduleId', () => {
      // arrange
      const task = createMockTask();
      const expectedResult = undefined;
      // act
      Generator.next(task);
      const result = Generator.next({ payload: { moduleId: 'other' } }).value;
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getLocale', () => {
    let Generator;
    const locale = 'en';
    const request = [];
    beforeEach(() => {
      // arrange
      Generator = getLocale({ locale, request, moduleId });
      let expectedResult = put(requestMessages({ locale, request }));
      // act
      let result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);

      // arrange
      expectedResult = race({
        success: take(MESSAGES_SUCCESS),
        fail: take(MESSAGES_FAIL)
      });
      // act
      result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });

    describe('winner: fail', () => {
      it('should dispatch changeLocaleFail with the response error and module Id', () => {
        // arrange
        const error = new Error('some error');
        const response = { fail: { error } };
        const expectedResult = put(changeLocaleFail(error, moduleId));
        // act
        const result = Generator.next(response).value;
        // assert
        expect(result).toEqual(expectedResult);
      });
    });

    describe('winner: success', () => {
      it('should dispatch changeLocaleSuccess with response.locale and moduleId if locales match', () => {
        // arrange
        const response = { success: { locale } };
        const expectedResult = put(changeLocaleSuccess(locale, moduleId));
        // act
        const result = Generator.next(response).value;
        // assert
        expect(result).toEqual(expectedResult);
      });

      it('should dispatch changeLocaleCancel with moduleId if locales don\'t match', () => {
        // this shouldn't happen and should be followed by a warning
        // arrange
        const response = { success: { locale: 'he' } };
        const expectedResult = put(changeLocaleCancel(moduleId));
        // act
        const result = Generator.next(response).value;
        // assert
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
