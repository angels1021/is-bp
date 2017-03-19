/**
 * Test fetchAll sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { delay } from 'redux-saga';
import { fork, take, put, select, race, call } from 'redux-saga/effects';
import { MESSAGES_SUCCESS, MESSAGES_FAIL } from 'api/translations/constants';
import { requestMessages } from 'api/translations/actions';
import { ASYNC_SUCCESS, ASYNC_FAIL } from 'common/containers/App/constants';
import { asyncSuccess, asyncFail, asyncRequest } from 'common/containers/App/actions';
import {
  fetchMessages,
  fetchResource,
  waitForComplete,
  waitForOther,
  callFetchSaga,
  createRequestId
} from '../sagas';

describe('API fetchAll sagas', () => {
  describe('createRequestId', () => {
    it('should return a correctly formatted requestId', () => {
      // arrange
      const expectedResult = 'clark/FETCH_ALL';
      // act
      const result = createRequestId('clark');
      // assert
      expect(result).toBe(expectedResult);
    });
  });

  describe('waitForComplete', () => {
    let Generator;
    beforeEach(() => {
      Generator = waitForComplete('clark');
      const expectedResult = take([ASYNC_SUCCESS, ASYNC_FAIL]);
      // act
      const result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });
    it('should wait for a complete or fail action for the requested id', () => {
      // act
      const result = Generator.next({ meta: { id: 'clark' } });
      // assert
      expect(result.value).toBe(true);
      expect(result.done).toBe(true);
    });
    it('should loop back for incorrect id', () => {
      // arrange
      const expectedResult = take([ASYNC_SUCCESS, ASYNC_FAIL]);
      // act
      const result = Generator.next({ meta: 'bruce' }).value;
      // assert
      expect(result).toEqual(expectedResult);
    });
    it('should ignore error for incorrect id', () => {
      // arrange
      const expectedResult = take([ASYNC_SUCCESS, ASYNC_FAIL]);
      // act
      const result = Generator.next({
        meta: { id: 'bruce' },
        error: true,
        payload: new Error('Joker')
      }).value;
      // assert
      expect(result).toEqual(expectedResult);
    });
    it('should throw error for correct id', () => {
      // act
      const result = () => Generator.next({
        meta: { id: 'clark' },
        error: true,
        payload: new Error('Lex')
      });
      // assert
      expect(result).toThrow('Lex');
    });
  });

  describe('waitForOther', () => {
    describe('initialize', () => {
      let Generator;
      const resolveSelector = () => true;
      const isLoading = jest.fn(() => true);
      beforeEach(() => {
        Generator = waitForOther('clark', resolveSelector);
      });
      // checkSelectors throw
      it('should call check loading state and resolver state', () => {
        // act
        let result = Generator.next().value;
        // assert - since we have internal constants, we are not checking the whole shape
        expect(result.SELECT).toBeDefined();
        result = Generator.next(isLoading).value;
        expect(isLoading).toBeCalledWith('clark');

        const expectedResult = select(resolveSelector);
        expect(result).toEqual(expectedResult);
      });
      it('if not loading, should check if request failed. if finds error, throw and terminate', () => {
        // assert
        Generator.next();
        isLoading.mockReturnValueOnce(false);
        const result = Generator.next(isLoading).value;

        expect(result.SELECT).toBeDefined();
        const hasError = jest.fn(() => new Error('Lex'));
        expect(() => (Generator.next(hasError))).toThrow('Lex');
        expect(Generator.next().done).toBe(true);
        expect(hasError).toBeCalledWith('clark');
      });
    });
    // loading: true resolved: false - wait for both
    // loading: true resolved: true - wait for loading
    // loading: false resolved: false - wait for resolved
    // loading: false resolved: true - terminate
    describe('loading: true resolved: false', () => {
      const resolveSelector = () => false;
      const isLoading = () => true;
      const Generator = waitForOther('clark', resolveSelector);
      Generator.next();
      Generator.next(isLoading);

      // const checkSelectorsFirstCall = Generator.next().value; // checkSelectors
      it('should wait for either a success or failed response', () => {
        // arrange
        const expectedResult = call(waitForComplete, 'clark');
        // act
        const result = Generator.next(false).value;
        // assert
        expect(result).toEqual(expectedResult);
      });

      it('should wait for the resolveSelector to resolve', () => {
        // arrange
        const expectedResult = select(resolveSelector);
        // act
        const result = Generator.next().value;
        // assert
        expect(result).toEqual(expectedResult);
      });

      it('should delay the and loop back until resolved', () => {
        // arrange
        const delayNext = call(delay, 200);
        // act
        let result = Generator.next(false).value;
        // assert
        expect(result).toEqual(delayNext);
        // arrange
        const querySelector = select(resolveSelector);
        // act
        result = Generator.next().value;
        // assert
        expect(result).toEqual(querySelector);
        // act
        result = Generator.next(false).value;
        // assert
        expect(result).toEqual(delayNext);
        // act
        result = Generator.next().value;
        // assert
        expect(result).toEqual(querySelector);
      });
      it('should skip delay and complete once resolveSelector is resolved', () => {
        // act
        const result = Generator.next(true);
        // assert
        expect(result.value).toBe(true);
        expect(result.done).toBe(true);
      });
    });

    describe('loading: true resolved: true', () => {
      it('should skip while loop and resolve', () => {
        // arrange
        const Generator = waitForOther('clark');
        Generator.next(); // select
        Generator.next(() => true); // select resolved
        Generator.next(true); // waitForComplete
        // act
        const result = Generator.next();
        // assert
        expect(result.value).toBe(true);
        expect(result.done).toBe(true);
      });
    });

    describe('loading: false resolved: false', () => {
      it('should skip watcher and run while loop', () => {
        // arrange
        const resolveSelector = () => {};
        const Generator = waitForOther('clark', resolveSelector);
        Generator.next(); // select loading
        Generator.next(() => false); // select error
        Generator.next(() => false); // select resolved
        const expectedResult = select(resolveSelector);
        // act
        let result = Generator.next(false).value; // select resolved
        // assert
        expect(result).toEqual(expectedResult);
        // act
        result = Generator.next(true);
        // assert
        expect(result.value).toBe(true);
        expect(result.done).toBe(true);
      });
    });

    describe('loading: false resolved: true', () => {
      it('should complete right away', () => {
        const Generator = waitForOther('clark');
        Generator.next(); // select loading
        Generator.next(() => false); // select error
        Generator.next(() => false); // select resolved
        // act
        const result = Generator.next(true); // complete
        // assert
        expect(result.value).toBe(true);
        expect(result.done).toBe(true);
      });
    });
  });

  describe('fetchResource', () => {
    let Generator;
    const action = { type: 'REQUEST' };
    const takeSuccess = 'SUCCESS';
    const takeFail = 'FAIL';
    beforeEach(() => {
      // arrange
      Generator = fetchResource(action, takeSuccess, takeFail);
      let expectedResult = put(action);
      // act
      let result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
      // arrange
      expectedResult = race({
        success: take(takeSuccess),
        fail: take(takeFail)
      });
      // act
      result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });

    it('should throw and terminate, on error', () => {
      // arrange
      const fail = {
        payload: { error: new Error('Lex') }
      };
      // assert
      expect(() => Generator.next({ fail })).toThrow('Lex');
      expect(Generator.next().done).toBe(true);
    });
    it('should return response and terminate, on success', () => {
      // arrange
      const success = { notImportant: 'walk in the sun' };
      // act
      const result = Generator.next({ success });
      // assert
      expect(result.value).toEqual(success);
      expect(result.done).toBe(true);
    });
  });

  describe('fetchMessages', () => {
    const request = [{ module: 'batman', page: 'bruce' }];
    const selectLocale = () => 'en';
    const Generator = fetchMessages(selectLocale, request);
    it('should get current locale through provided selector', () => {
      // arrange
      const expectedResult = select(selectLocale);
      // act
      const result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });
    it('should call fetchResource with requestMessages action and messages success and fail constants', () => {
      // arrange
      const expectedResult = fork(
        fetchResource,
        requestMessages('en', request),
        MESSAGES_SUCCESS,
        MESSAGES_FAIL
      );
      // act
      const result = Generator.next('en').value;
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('callFetchSaga', () => {
    // we have three paths
    // with/without parentId, success, error
    const payload = {
      requestId: 'Clark',
      parentId: 'Jonathan',
      fetchGenerator: () => true,
      resolveSelector: () => true
    };
    describe('no parentId', () => {
      const { requestId, fetchGenerator } = payload;
      const Generator = callFetchSaga({ requestId, fetchGenerator });
      it('should dispatch asyncRequest action for the requestId', () => {
        // arrange
        const fetchRequestId = createRequestId(requestId);
        const expectedResult = put(asyncRequest(fetchRequestId));
        // act
        const result = Generator.next().value;
        // assert
        expect(result).toEqual(expectedResult);
      });
    });

    describe('with parentId success', () => {
      const Generator = callFetchSaga(payload);
      const { requestId, fetchGenerator, parentId, resolveSelector } = payload;
      const fetchRequestId = createRequestId(requestId);
      it('should wait for parent to resolve if parentId is passed', () => {
        // arrange
        const expectedResult = call(waitForOther, createRequestId(parentId), resolveSelector);
        // act
        const result = Generator.next().value;
        // assert
        expect(result).toEqual(expectedResult);
      });
      it('should dispatch asyncRequest action for the requestId', () => {
        // arrange
        const expectedResult = put(asyncRequest(fetchRequestId));
        // act
        const result = Generator.next().value;
        // assert
        expect(result).toEqual(expectedResult);
      });
      it('should call the requested fetchGenerator and wait to resolve', () => {
        // arrange
        const expectedResult = call(fetchGenerator, fetchRequestId);
        // act
        const result = Generator.next().value;
        // assert
        expect(result).toEqual(expectedResult);
      });
      it('should dispatch asyncSuccess action for the requestId', () => {
        // arrange
        const expectedResult = put(asyncSuccess(fetchRequestId));
        // act
        const result = Generator.next('responseValue').value;
        // assert
        expect(result).toEqual(expectedResult);
      });
    });

    describe('with error', () => {
      const Generator = callFetchSaga(payload);
      const { requestId } = payload;
      const error = new Error('Lex');
      it('should dispatch asyncRequest action for the requestId', () => {
        // arrange
        const fetchRequestId = createRequestId(requestId);
        const expectedResult = put(asyncFail(error, fetchRequestId));
        // act
        Generator.next(); // wait for parent
        Generator.next(); // put request
        Generator.next(); // call generator
        const result = Generator.throw(error).value;
        // assert
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
