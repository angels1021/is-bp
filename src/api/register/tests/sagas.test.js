/*
*
* Tests for register sagas
*
* */
/* eslint-disable redux-saga/yield-effects */
import { createMockTask } from 'redux-saga/utils';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { register } from '../../../utils/auth';
import {
  sendingRequest,
  requestError,
  changeForm
} from '../actions';
import { REGISTER_REQUEST, cleanForm } from '../constants';
import {
  registerFlow,
  registerWatcher,
  callAuthorize
} from '../sagas';

describe('Sagas for register api', () => {
  describe('registerFlow saga', () => {
    const Generator = registerFlow();
    const watcher = createMockTask();
    it('should starts watcher', () => {
      // act
      const step = Generator.next().value;
      // assert
      expect(step).toEqual(fork(registerWatcher));
    });

    it('should watch for location change', () => {
      // act
      const step = Generator.next(watcher).value;
      // assert
      expect(step).toEqual(take(LOCATION_CHANGE));
    });

    it('should cancel the watcher which will cancel the call saga', () => {
      // act
      const step = Generator.next().value;
      // assert
      expect(step).toEqual(cancel(watcher));
    });
  });

  describe('registerWatcher saga', () => {
    // arrange
    let Generator;
    const request = {
      data: { username: 'Tom', password: 'McFly' }
    };


    beforeEach(() => {
      // arrange
      Generator = registerWatcher();
      // act
      const stepWatch = Generator.next().value;
      // assert
      expect(stepWatch).toEqual(take(REGISTER_REQUEST));

      // act
      const { username, password } = request.data;
      const stepCall = Generator.next(request).value;
      expect(stepCall).toEqual(call(callAuthorize, { username, password }));
    });

    it('if successful, should reset form and redirect to /confirmRegistration', () => {
      // arrange
      const response = true;
      // act
      const stepForm = Generator.next(response).value;
      // assert
      expect(stepForm).toEqual(put(changeForm({ ...cleanForm })));

      // act
      const stepPush = Generator.next().value;
      // assert
      expect(stepPush).toEqual(put(push('/confirmRegistration')));
    });

    it('if failed', () => {
      // arrange
      const response = false;
      // act
      const step = Generator.next(response).value;
      // assert
      expect(step).toBe(undefined);
    });
  });

  describe('callAuthorize saga', () => {
    let Generator;
    const formData = {
      username: 'Tom',
      password: 'McFly'
    };

    beforeEach(() => {
      Generator = callAuthorize(formData);

      const dispatchBusy = Generator.next().value;

      expect(dispatchBusy).toEqual(put(sendingRequest(true)));

      const callRegister = Generator.next().value;

      expect(callRegister).toEqual(call(register, formData));
    });

    describe('successful', () => {
      // arrange
      const res = { response: { token: 'ok' } };
      // create local variable of logoutGenerator at it's 'beforeEach' state,
      // so the tests progress from that point.
      let localGenerator;

      it('should dispatch sendingRequest:false', () => {
        // arrange
        localGenerator = Generator;

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
        localGenerator = Generator;
        const { error } = res;

        // act
        const dispatchError = localGenerator.next(res).value;

        // assert
        expect(dispatchError).toEqual(put(requestError(error)));
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
});
