/**
 * Test sagas.login
 */
import { fromJS } from 'immutable';
import { delay } from 'lodash-es';
import SagaTester from 'redux-saga-tester';
import { push } from 'react-router-redux';
import { login, logout, setLoggedIn } from 'utils/auth';
import authReducer, { initialStateJS } from '../reducer';
import { login as loginRequest, logout as logoutRequest, authRequest, authSuccess, authError, authSet } from '../actions';
import { LOGIN_REQUEST, AUTH_SUCCESS, LOGOUT_REQUEST } from '../constants';
import { loginWatcher } from '../sagas.login';
import { logoutWatcher } from '../sagas.logout';

jest.mock('utils/auth');

const mockForm = {
  toObject: () => ({
    username: 'Tom',
    password: 'McFly',
    location: '/cr/1',
    code: ''
  })
};

describe('sagas.login', () => {
  describe('successful login', () => {
    // arrange
    const sagaTester = new SagaTester({
      initialState: { auth: fromJS(initialStateJS) },
      reducers: { auth: authReducer }
    });
    login.mockImplementationOnce(() => ({
      response: {
        user: { id: 'tom' },
        token: 'doug'
      }
    }));
    sagaTester.start(loginWatcher);
    // act
    // start saga
    sagaTester.dispatch(loginRequest(mockForm));

    it('should follow the correct actions', () => {
      // arrange
      const expectedActions = [
        // dispatch login
        loginRequest(mockForm),
        // start callLogin - dispatch request
        authRequest(LOGIN_REQUEST),
        // successful - dispatch success
        authSuccess({ id: 'tom' }),
        // set logged in in reducer
        authSet(true),
        // location change
        push('/cr/1')
      ];

      // assert
      const actions = sagaTester.getCalledActions();
      expect(actions).toEqual(expectedActions);
    });
    it('should call login api and set loggedIn with response.token', () => {
      // assert
      expect(login).toHaveBeenCalledTimes(1);
      expect(setLoggedIn).toHaveBeenCalledWith('doug');
    });
    it('should set response.user in the reducer and set isLoggedIn to true', () => {
      // arrange
      const reducer = sagaTester.getState().auth;
      // assert
      expect(reducer.getIn(['user', 'id'])).toBe('tom');
      expect(reducer.get('isLoggedIn')).toBe(true);
    });
  });
  describe('wrong username/password', () => {
    // arrange
    const error = new Error('password or username are wrong');
    const sagaTester = new SagaTester({
      initialState: { auth: fromJS(initialStateJS) },
      reducers: { auth: authReducer }
    });
    login.mockClear();
    login.mockImplementationOnce(() => ({ response: false }));
    // act
    // start saga
    sagaTester.start(loginWatcher);
    sagaTester.dispatch(loginRequest(mockForm));

    it('should follow the correct actions', () => {
      // arrange
      const expectedActions = [
        // dispatch login
        loginRequest(mockForm),
        // start callLogin - dispatch request
        authRequest(LOGIN_REQUEST),
        // falsey response - dispatch Error
        authError(error),
        // set logged in false in reducer
        authSet(false)
      ];

      // assert
      const actions = sagaTester.getCalledActions();
      expect(actions).toEqual(expectedActions);
    });
    it('should call login api', () => {
      // assert
      expect(login).toHaveBeenCalledTimes(1);
    });
    it('should set the error in the reducer and set isLoggedIn to true', () => {
      // arrange
      const reducer = sagaTester.getState().auth;
      // assert
      expect(reducer.get('error')).toEqual(error);
      expect(reducer.get('isLoggedIn')).toBe(false);
    });
  });
  describe('response error', () => {
    // arrange
    const plainError = new Error('password or username are wrong');
    const serverError = new Error('server error');
    const sagaTester = new SagaTester({
      initialState: { auth: fromJS(initialStateJS) },
      reducers: { auth: authReducer }
    });
    login.mockClear();
    login.mockImplementationOnce(() => ({ error: serverError }));
    // act
    // start saga
    sagaTester.start(loginWatcher);
    sagaTester.dispatch(loginRequest(mockForm));

    it('should follow the correct actions', () => {
      // arrange
      const expectedActions = [
        // dispatch login
        loginRequest(mockForm),
        // start callLogin - dispatch request
        authRequest(LOGIN_REQUEST),
        // failed - dispatch error
        authError(plainError),
        // set logged in false in reducer
        authSet(false)
      ];

      // assert
      const actions = sagaTester.getCalledActions();
      expect(actions).toEqual(expectedActions);
    });
    it('should call login api', () => {
      // assert
      expect(login).toHaveBeenCalledTimes(1);
    });
    it('should set the error in the reducer and set isLoggedIn to true', () => {
      // arrange
      const reducer = sagaTester.getState().auth;
      // assert
      expect(reducer.get('error')).toEqual(plainError);
      expect(reducer.get('isLoggedIn')).toBe(false);
    });
  });
  describe('second call to LOGIN_REQUEST dispatched before complete', () => {
    // arrange
    const sagaTester = new SagaTester({
      initialState: { auth: fromJS(initialStateJS) },
      reducers: { auth: authReducer }
    });
    login.mockClear();
    login.mockImplementation(() => new Promise((resolve) => delay(resolve, 300, {
      response: {
        user: { id: 'tom' },
        token: 'doug'
      }
    })));
    // act
    // start saga
    sagaTester.start(loginWatcher);
    sagaTester.dispatch(loginRequest(mockForm));
    delay(() => {
      sagaTester.dispatch(loginRequest(mockForm));
    }, 200);

    it('should follow the correct actions', async () => {
      // arrange
      const expectedActions = [
        // dispatch login
        loginRequest(mockForm),
        // start callLogin - dispatch request
        authRequest(LOGIN_REQUEST),
        // dispatch login again
        loginRequest(mockForm),
        // RE-start callLogin - dispatch request
        authRequest(LOGIN_REQUEST),
        // successful - dispatch success
        authSuccess({ id: 'tom' }),
        // set logged in in reducer
        authSet(true),
        // location change
        push('/cr/1')
      ];

      // wait for a calls to complete
      await sagaTester.waitFor(AUTH_SUCCESS);
      // assert
      const actions = sagaTester.getCalledActions();
      expect(actions).toEqual(expectedActions);
    });

    it('should cancel running sagas when second request dispatched', () => {
      // assert
      expect(sagaTester.numCalled(LOGIN_REQUEST)).toBe(2);
      expect(sagaTester.numCalled(AUTH_SUCCESS)).toBe(1);
    });
  });
  describe('LOGOUT_REQUEST called before complete', () => {
    // arrange
    const sagaTester = new SagaTester({
      initialState: { auth: fromJS(initialStateJS) },
      reducers: { auth: authReducer }
    });
    login.mockClear();
    login.mockImplementation(() => new Promise((resolve) => delay(resolve, 300, {
      response: {
        user: { id: 'tom' },
        token: 'doug'
      }
    })));
    // act
    // start saga
    sagaTester.start(loginWatcher);
    sagaTester.start(logoutWatcher);
    sagaTester.dispatch(loginRequest(mockForm));
    delay(() => {
      sagaTester.dispatch(logoutRequest('tom'));
    }, 200);
    it('should follow the correct actions', async () => {
      // arrange
      const expectedActions = [
        // dispatch login
        loginRequest(mockForm),
        // start callLogin - dispatch request
        authRequest(LOGIN_REQUEST),
        // dispatch logoutRequest
        logoutRequest('tom'),
        // start callLogout - dispatch request
        authRequest(LOGOUT_REQUEST),
        // optimistic success
        authSuccess(),
        // optimistic set logged out false in reducer
        authSet(false),
        // // location change
        push('/login')
      ];
      // wait for logout complete
      await sagaTester.waitFor(AUTH_SUCCESS);
      // assert
      const actions = sagaTester.getCalledActions();
      expect(actions).toEqual(expectedActions);
    });
    it('should cancel login task and continue only through logoutWatcher', () => {
      expect(sagaTester.numCalled(LOGIN_REQUEST)).toBe(1);
      expect(sagaTester.numCalled(LOGOUT_REQUEST)).toBe(1);
      expect(sagaTester.numCalled(AUTH_SUCCESS)).toBe(1);
      expect(logout).toHaveBeenCalled();
    });
  });
});
