/**
 * Test fetchAll utils
 */
/* eslint-disable redux-saga/yield-effects */
import { fork, take, put, select, race } from 'redux-saga/effects';
import { MESSAGES_SUCCESS, MESSAGES_FAIL } from 'api/translations/constants';
import { requestMessages } from 'api/translations/actions';
import {
  fetchMessages,
  fetchResource,
  waitForOther,
  checkSelectors,
  createRequestId
} from '../utils';

describe('API fetchAll utils', () => {
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

  describe('checkSelectors', () => {
    // with error
    // success
    const loadingInternal = jest.fn(() => false);
    const errorInternal = jest.fn().mockReturnValueOnce(new Error('Lex'));
    const requestId = 'clark';
    const loadingSelector = () => loadingInternal;
    const resolveSelector = () => true;
    // will throw once for error testing
    const errorSelector = () => errorInternal;

    it('should throw if errorSelector returns an error', () => {
      // arrange
      const Generator = checkSelectors({ requestId, loadingSelector, errorSelector, resolveSelector });
      const expectedResult = select(errorSelector);
      // act
      const result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
      expect(() => (Generator.next(errorInternal))).toThrow('Lex');
      expect(errorInternal).toHaveBeenCalled();
    });
    it('should check if request is loading and resolveSelector is resolved', () => {
      // arrange
      const Generator = checkSelectors({ requestId, loadingSelector, errorSelector, resolveSelector });
      let expectedResult = select(loadingSelector);
      // act
      Generator.next(); // select errorSelector
      let next = Generator.next(errorInternal).value;
      // assert
      expect(next).toEqual(expectedResult);
      // arrange
      expectedResult = select(resolveSelector);
      // act
      next = Generator.next(loadingInternal).value;
      // assert
      expect(next).toEqual(expectedResult);
      // arrange
      expectedResult = { isLoading: false, resolved: true };
      // act
      next = Generator.next(true).value;
      // assert
      expect(next).toEqual(expectedResult);
      expect(loadingInternal).toHaveBeenCalled();
    });
  });

  describe('waitForOther', () => {
    describe('initialize', () => {
      const Generator = waitForOther('clark');
      // checkSelectors throw
      it('should call checkSelectors', () => {
        // act
        const result = Generator.next().value;
        // assert - since we have internal constants, we are not checking the whole shape
        expect(result.CALL).toBeDefined();
        // check that the correct generator is called
        expect(result.CALL.fn).toEqual(checkSelectors);
        // check that the requestId argument was passed properly
        expect(result.CALL.args[0]).toHaveProperty('requestId', 'clark');
        // check that the default value was set
        expect(result.CALL.args[0]).toHaveProperty('resolveSelector', expect.any(Function));
      });
      it('should throw if checkSelectors throws and terminate', () => {
        // assert
        expect(() => (Generator.throw(new Error('Lex')))).toThrow('Lex');
        expect(Generator.next().done).toBe(true);
      });
    });
    // loading: true resolved: false - wait for both
    // loading: true resolved: true - wait for loading
    // loading: false resolved: false - wait for resolved
    // loading: false resolved: true - terminate
    describe('loading: true resolved: false', () => {
      const Generator = waitForOther('clark', () => {});
      const checkSelectorsFirstCall = Generator.next().value; // checkSelectors
      it('should enter while and call checkSelectors again', () => {
        // act
        const result = Generator.next({
          isLoading: true,
          resolved: false
        }).value;
        // assert
        expect(result).toEqual(checkSelectorsFirstCall);
      });
      it('loading: true resolved: true -> should loop again', () => {
        // act
        const result = Generator.next({
          isLoading: true,
          resolved: true
        }).value;
        // assert
        expect(result).toEqual(checkSelectorsFirstCall);
      });
      it('unchanged -> should loop again', () => {
        // act
        const result = Generator.next({
          isLoading: true,
          resolved: true
        }).value;
        // assert
        expect(result).toEqual(checkSelectorsFirstCall);
      });
      it('loading: false resolved: false -> should loop again (for test)', () => {
        // act
        const result = Generator.next({
          isLoading: false,
          resolved: false
        }).value;
        // assert
        expect(result).toEqual(checkSelectorsFirstCall);
      });
      it('loading: false resolved: true -> should complete and terminate', () => {
        // act
        const result = Generator.next({
          isLoading: false,
          resolved: true
        });
        // assert
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
});
