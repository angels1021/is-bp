/*
*
* Tests for login sagas
*
* */
/* eslint-disable redux-saga/yield-effects */
import { push } from 'react-router-redux';
import { take, call, put, race } from 'redux-saga/effects';
import { logout, login } from '../../../api';
import {
  sendingRequest,
  setAuth,
  requestError,
  logoutSuccess,
  loginSuccess
} from '../actions';
import {
  LOGIN_REQUEST,
  LOGOUT
} from '../constants';
import {
  callLogout,
  logoutWatcher,
  callAuthorize,
  loginWatcher
} from '../sagas';

describe('Sagas for login api', () => {
  describe('callLogout saga', () => {
    // since this saga has a try/catch block we need to test both cases
    let logoutGenerator;
    const userID = 1;
    beforeEach(() => {
      // arrange
      logoutGenerator = callLogout(userID);

      // act
      const dispathBusy = logoutGenerator.next().value;

      // assert
      expect(dispathBusy).toEqual(put(sendingRequest(true)));

      // act - call auth.logout
      const actionLogout = logoutGenerator.next().value;

      // assert
      expect(actionLogout).toEqual(call(logout, userID));
    });

    describe('successful', () => {
      // arrange
      const res = { response: 'ok' };
      // create local variable of logoutGenerator at it's 'beforeEach' state,
      // so the tests progress from that point.
      let localGenerator;

      it('should dispatch sendingRequest:false action', () => {
        // arrange
        localGenerator = logoutGenerator;
        // act - idle (finally block)
        const dispatchIdle = localGenerator.next(res);
        // assert
        expect(dispatchIdle.value).toEqual(put(sendingRequest(false)));
      });

      it('should return the response and end', () => {
        // arrange
        const { response } = res;

        // act - return
        const finalReturn = localGenerator.next();

        // assert
        expect(finalReturn.value).toBe(response);
        expect(finalReturn.done).toBe(true);
      });
    });

    describe('failed', () => {
      // arrange
      const res = { error: new Error('logout error') };
      // create local variable of logoutGenerator at it's 'beforeEach' state,
      // so the tests progress from that point.
      let localGenerator;

      it('should dispatch requestError:error', () => {
        // arrange
        const { error } = res;
        localGenerator = logoutGenerator;

        // act - error
        const dispatchError = localGenerator.next(res).value;

        // assert
        expect(dispatchError).toEqual(put(requestError(error)));
      });

      it('should dispatch sendingRequest:false', () => {
        // act - idle (finally block)
        const dispatchIdle = localGenerator.next().value;

        // assert
        expect(dispatchIdle).toEqual(put(sendingRequest(false)));
      });

      it('should return false and end', () => {
        // act - return
        const finalReturn = localGenerator.next();

        // assert
        expect(finalReturn.value).toBe(false);
        expect(finalReturn.done).toBe(true);
      });
    });
  });

  describe('logoutWatcher saga', () => {
    // arrange
    const watcherGenerator = logoutWatcher();
    const userId = 1;
    let takeEffect;
    it('should take LOGOUT action', () => {
      // act - watch
      takeEffect = watcherGenerator.next().value;

      // assert
      expect(takeEffect).toEqual(take(LOGOUT));
    });

    it('should dispatch setAuth:false', () => {
      // act - auth
      const putAction = watcherGenerator.next({ userId }).value;

      // assert
      expect(putAction).toEqual(put(setAuth(false)));
    });

    it('should dispatch the logoutSuccess action', () => {
      // act - call callLogout saga
      const callEffect = watcherGenerator.next().value;

      // assert
      expect(callEffect).toEqual(put(logoutSuccess()));
    });

    it('should navigate to "/login"', () => {
      // act - navigate
      const pushAction = watcherGenerator.next().value;

      // assert
      expect(pushAction).toEqual(put(push('/login')));
    });

    it('should call callLogout saga', () => {
      // act - call callLogout saga
      const callEffect = watcherGenerator.next().value;

      // assert
      expect(callEffect).toEqual(call(callLogout, userId));
    });

    it('should loop back to take LOGOUT action', () => {
      // act - back to the beginning
      const whileLoop = watcherGenerator.next().value;

      // assert
      expect(whileLoop).toEqual(takeEffect);
    });
  });

  describe('callAuthorize saga', () => {
    let loginGenerator;
    const formData = {
      username: 'Tom',
      password: 'McFly',
      code: ''
    };
    beforeEach(() => {
      loginGenerator = callAuthorize(formData);

      const dispatchBusy = loginGenerator.next().value;

      expect(dispatchBusy).toEqual(put(sendingRequest(true)));

      const callLogin = loginGenerator.next().value;

      expect(callLogin).toEqual(call(login, formData));
    });

    describe('successful', () => {
      // arrange
      const res = { response: { token: 'ok' } };
      // create local variable of logoutGenerator at it's 'beforeEach' state,
      // so the tests progress from that point.
      let localGenerator;

      it('should dispatch sendingRequest:false', () => {
        // arrange
        localGenerator = loginGenerator;

        // act
        const dispatchIdle = localGenerator.next(res).value;

        // assert
        expect(dispatchIdle).toEqual(put(sendingRequest(false)));
      });

      it('should return the response and end', () => {
        // arrange
        const { response } = res;

        // act
        const finalReturn = localGenerator.next();

        // assert
        expect(finalReturn.value).toEqual(response);
        expect(finalReturn.done).toBe(true);
      });
    });

    describe('failed', () => {
      // arrange
      const res = { error: new Error('failed') };
      // create local variable of logoutGenerator at it's 'beforeEach' state,
      // so the tests progress from that point.
      let localGenerator;

      it('should dispatch requestError:error', () => {
        // arrange
        localGenerator = loginGenerator;
        const { error } = res;

        // act
        const dispatchError = localGenerator.next(res).value;

        // assert
        expect(dispatchError).toEqual(put(requestError(error)));
      });

      it('should dispatch setAuth:false', () => {
        // act - auth
        const putAction = localGenerator.next().value;

        // assert
        expect(putAction).toEqual(put(setAuth(false)));
      });

      it('should dispatch sendingRequest:false', () => {
        // act
        const dispatchIdle = localGenerator.next().value;

        // assert
        expect(dispatchIdle).toEqual(put(sendingRequest(false)));
      });

      it('should return false and end', () => {
        // act
        const finalReturn = localGenerator.next();

        // assert
        expect(finalReturn.value).toBe(false);
        expect(finalReturn.done).toBe(true);
      });
    });
  });

  describe('loginWatcher', () => {
    // arrange
    let watcherGenerator;
    let takeEffect;
    // we have 3 situations to check here:
    // 1. auth won with response - login succeeded
    // 2. auth won with false - login failed
    // 3. logout won - login is canceled and logout saga is started.

    const request = {
      type: LOGIN_REQUEST,
      data: {
        username: 'Tom',
        password: 'McFly',
        location: '/cr/1',
        code: ''
      }
    };
    const { username, password, location, code } = request.data;

    // setup
    beforeEach(() => {
      // arrange
      watcherGenerator = loginWatcher();

      // act
      takeEffect = watcherGenerator.next().value;
      // assert
      expect(takeEffect).toEqual(take(LOGIN_REQUEST));

      // arrange
      const expectedEffect = race({
        auth: call(callAuthorize, { username, password, code }),
        logoutCall: take(LOGOUT)
      });
      // act
      const raceEffect = watcherGenerator.next(request).value;
      // assert
      expect(raceEffect).toEqual(expectedEffect);
    });

    describe('auth successful', () => {
      let localGenerator;
      const response = { auth: { firstName: 'tom', role: 'admin' } };
      it('should dispatch setAuth:true', () => {
        // arrange
        localGenerator = watcherGenerator;
        // act
        const putEffect = localGenerator.next(response).value;
        // assert
        expect(putEffect).toEqual(put(setAuth(true)));
      });

      it('should pass user data to acation creator', () => {
        // assert
        const { auth } = response;
        // act
        const dispatchUser = localGenerator.next().value;
        // assert
        expect(dispatchUser).toEqual(put(loginSuccess(auth)));
      });

      it('should redirect to the requested location', () => {
        // act
        const dispatchPush = localGenerator.next().value;
        // assert
        expect(dispatchPush).toEqual(put(push(location)));
      });

      it('should loop back to take(LOGIN_REQUEST)', () => {
        // act
        const whileLoop = localGenerator.next().value;
        // assert
        expect(whileLoop).toEqual(takeEffect);
      });
    });

    describe('auth failed', () => {
      const response = { auth: false };
      it('should loop back to take(LOGIN_REQUEST)', () => {
        // act
        const whileLoop = watcherGenerator.next(response).value;
        // assert
        expect(whileLoop).toEqual(takeEffect);
      });
    });

    describe('logout was called', () => {
      let localGenerator;
      const response = { logoutCall: { action: LOGOUT, userId: 1 }, auth: false };

      it('should dispatch setAuth:false', () => {
        // arrange
        localGenerator = watcherGenerator;
        // act
        const putEffect = localGenerator.next(response).value;
        // assert
        expect(putEffect).toEqual(put(setAuth(false)));
      });

      it('should dispatch the logoutSuccess action', () => {
        // act - call callLogout saga
        const putSuccessEffect = localGenerator.next().value;
        // assert
        expect(putSuccessEffect).toEqual(put(logoutSuccess()));
      });

      it('should redirect to the login page', () => {
        // act
        const dispatchPush = localGenerator.next().value;
        // assert
        expect(dispatchPush).toEqual(put(push('/login')));
      });

      it('should start callLogoutSaga', () => {
        // arrange
        const { userId } = response.logoutCall;
        // act
        const sagaLogout = localGenerator.next().value;
        // assert
        expect(sagaLogout).toEqual(call(callLogout, userId));
      });

      it('should loop back to take(LOGIN_REQUEST)', () => {
        // act
        const whileLoop = localGenerator.next().value;
        // assert
        expect(whileLoop).toEqual(takeEffect);
      });
    });
  });
});
