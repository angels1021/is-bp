/**
 * Test sagas.logout
 */

import { fromJS } from 'immutable';
import { delay } from 'lodash-es';
import SagaTester from 'redux-saga-tester';
import { CALL_HISTORY_METHOD } from 'react-router-redux';
import { logout, clearLoggedIn } from 'utils/auth';
import authReducer, { initialStateJS } from '../reducer';
import { logout as logoutRequest } from '../actions';
import { LOGOUT_REQUEST, AUTH_SUCCESS, AUTH_REQUEST, AUTH_SET, AUTH_ERROR } from '../constants';
import { logoutWatcher } from '../sagas.logout';

jest.mock('utils/auth');

const logoutDelay = (time = 301) => new Promise((resolve) => delay(resolve, time));

describe('sagas.logout', () => {
  describe('successful logout', () => {
    // arrange
    const sagaTester = new SagaTester({
      initialState: { auth: fromJS(initialStateJS) },
      reducers: { auth: authReducer }
    });

    sagaTester.start(logoutWatcher);
    // act
    // start saga
    sagaTester.dispatch(logoutRequest('tom'));

    it('should follow the correct actions', async () => {
      // since success is optimistic, the order of these actions is not important
      expect(sagaTester.wasCalled(AUTH_REQUEST)).toBe(true);
      expect(sagaTester.wasCalled(AUTH_SUCCESS)).toBe(true);
      expect(sagaTester.wasCalled(AUTH_SET)).toBe(true);
      expect(sagaTester.wasCalled(CALL_HISTORY_METHOD)).toBe(true);
    });

    it('should call logout api with the userId and clear user token', () => {
      // assert
      expect(logout).toHaveBeenCalled();
      expect(logout).toHaveBeenCalledWith('tom');
      expect(clearLoggedIn).toHaveBeenCalled();
    });
    it('should clear the user in the reducer and set isLoggedIn to false', () => {
      // arrange
      const reducer = sagaTester.getState().auth;
      // assert
      expect(reducer.get('user').toJS()).toEqual({});
      expect(reducer.get('isLoggedIn')).toBe(false);
    });
  });
  describe('failed login', () => {
    // arrange
    const sagaTester = new SagaTester({
      initialState: { auth: fromJS(initialStateJS) },
      reducers: { auth: authReducer }
    });
    logout.mockClear();
    logout.mockImplementationOnce(
      () => new Promise((resolve) =>
        delay(resolve, 300, { error: new Error('ignore') })
      )
    );
    sagaTester.start(logoutWatcher);
    // act
    // start saga
    sagaTester.dispatch(logoutRequest('tom'));

    it('should behave same as success', async () => {
      // since success is optimistic, the order of these actions is not important
      expect(sagaTester.wasCalled(AUTH_REQUEST)).toBe(true);
      expect(sagaTester.wasCalled(AUTH_SUCCESS)).toBe(true);
      expect(sagaTester.wasCalled(AUTH_SET)).toBe(true);
      expect(sagaTester.wasCalled(CALL_HISTORY_METHOD)).toBe(true);

      await logoutDelay();

      expect(logout).toHaveBeenCalledTimes(1);
      expect(sagaTester.wasCalled(AUTH_ERROR)).toBe(false);

      // arrange
      const reducer = sagaTester.getState().auth;
      // assert
      expect(reducer.get('user').toJS()).toEqual({});
      expect(reducer.get('isLoggedIn')).toBe(false);
    });
  });
  describe('not accept new requests until previous request is complete', () => {
    let sagaTester;
    beforeEach(() => {
      sagaTester = new SagaTester({
        initialState: { auth: fromJS(initialStateJS) },
        reducers: { auth: authReducer }
      });
      logout.mockClear();
      sagaTester.start(logoutWatcher);
    });
    it('should only trigger a request once if busy', async () => {
      sagaTester.dispatch(logoutRequest('tom'));
      // assert
      expect(sagaTester.numCalled(LOGOUT_REQUEST)).toBe(1);
      expect(sagaTester.numCalled(AUTH_REQUEST)).toBe(1);
      // act
      delay(() => {
        sagaTester.dispatch(logoutRequest('tom'));
      }, 200);

      // wait until after we get the second request
      await logoutDelay(201);
      // assert
      expect(sagaTester.numCalled(LOGOUT_REQUEST)).toBe(2);
      expect(sagaTester.numCalled(AUTH_REQUEST)).toBe(1);
    });
    it('should trigger another request if completed', async () => {
      sagaTester.dispatch(logoutRequest('tom'));
      // assert
      expect(sagaTester.numCalled(LOGOUT_REQUEST)).toBe(1);
      expect(sagaTester.numCalled(AUTH_REQUEST)).toBe(1);
      // act
      delay(() => {
        sagaTester.dispatch(logoutRequest('tom'));
      }, 400);

      // wait until we after we get the second request
      await logoutDelay(401);
      // assert
      expect(sagaTester.numCalled(LOGOUT_REQUEST)).toBe(2);
      expect(sagaTester.numCalled(AUTH_REQUEST)).toBe(2);
    });
  });
});
