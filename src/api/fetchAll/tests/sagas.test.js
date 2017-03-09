/**
 * Test fetchAll sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { createMockTask } from 'redux-saga/utils';
import { takeEvery, takeLatest, fork, call, take, put, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { asyncSuccess, asyncFail, asyncRequest } from 'common/containers/App/actions';
import { waitForOther, createRequestId } from '../utils';
import { FETCH_ALL } from '../constants';
import {
  fetchWatcher,
  fetchFlow,
  watchFetchSaga,
  callFetchSaga
} from '../sagas';

describe('API fetchAll sagas', () => {
  const payload = {
    requestId: createRequestId('Clark'),
    parentId: createRequestId('Jonathan'),
    fetchGenerator: () => true,
    resolveSelector: () => true
  };
  describe('fetchWatcher', () => {
    it('should listen for any FETCH_ALL action ans start a fetchFlow', () => {
      // arrange
      const Generator = fetchWatcher();
      const expectedResult = fork(takeEvery, FETCH_ALL, fetchFlow);
      // act
      const result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('fetchFlow', () => {
    it('should error if options.requestId or options.fetchGenerator were passed', () => {
      // assert
      expect(fetchFlow({})).toThrowErrorMatchingSnapshot();
    });
    const Generator = fetchFlow({ payload });
    const watcher = createMockTask();
    it('should accept saga options and start a watcher', () => {
      // arrange
      const expectedResult = fork(watchFetchSaga, payload);
      // act
      const result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });
    it('should trigger the watcher once', () => {
      // arrange
      const expectedResult = put({ type: payload.requestId });
      // act
      const result = Generator.next(watcher).value;
      // assert
      expect(result).toEqual(expectedResult);
    });
    it('should listen for a LOCATION_CHANGE action and cancel the watcher', () => {
      // arrange
      let expectedResult = take(LOCATION_CHANGE);
      // act
      let result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
      // arrange
      expectedResult = cancel(watcher);
      // act
      result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('watchFetchSaga', () => {
    it('should start a watcher for the options.requestId', () => {
      // arrange
      const Generator = watchFetchSaga(payload);
      const expectedResult = fork(takeLatest, payload.requestId, callFetchSaga, payload);
      // act
      const result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('callFetchSaga', () => {
    // we have three paths
    // with/without parentId, success, error
    describe('no parentId', () => {
      const { requestId, fetchGenerator } = payload;
      const Generator = callFetchSaga({ requestId, fetchGenerator });
      it('should dispatch asyncRequest action for the requestId', () => {
        // arrange
        const expectedResult = put(asyncRequest(requestId));
        // act
        const result = Generator.next().value;
        // assert
        expect(result).toEqual(expectedResult);
      });
    });

    describe('with parentId success', () => {
      const Generator = callFetchSaga(payload);
      const { requestId, fetchGenerator, parentId, resolveSelector } = payload;
      it('should wait for parent to resolve if parentId is passed', () => {
        // arrange
        const expectedResult = call(waitForOther, parentId, resolveSelector);
        // act
        const result = Generator.next().value;
        // assert
        expect(result).toEqual(expectedResult);
      });
      it('should dispatch asyncRequest action for the requestId', () => {
        // arrange
        const expectedResult = put(asyncRequest(requestId));
        // act
        const result = Generator.next().value;
        // assert
        expect(result).toEqual(expectedResult);
      });
      it('should call the requested fetchGenerator and wait to resolve', () => {
        // arrange
        const expectedResult = call(fetchGenerator, requestId);
        // act
        const result = Generator.next().value;
        // assert
        expect(result).toEqual(expectedResult);
      });
      it('should dispatch asyncSuccess action for the requestId', () => {
        // arrange
        const expectedResult = put(asyncSuccess(requestId));
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
        const expectedResult = put(asyncFail(requestId, error));
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
