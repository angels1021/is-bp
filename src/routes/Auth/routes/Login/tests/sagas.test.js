/**
 * Test Login init sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { fork } from 'redux-saga/effects';
import { fetchMessages, callFetchSaga } from 'api/fetchAll/sagas';
import { PAGE, MODULE } from '../login.messages';
import { selectLocale } from '../../../selectors';
import { loginFetch, fetchFlow } from '../sagas';

describe('Login page sagas', () => {
  describe('loginFetch', () => {
    it('should fetch login page messages by locale', () => {
      // arrange
      const Generator = loginFetch();
      const messageRequest = [{ module: MODULE, page: PAGE }];
      // use stringify because jest comparison fails with defined objects
      const expectedResult = JSON.stringify(fork(fetchMessages, selectLocale(), messageRequest));
      // act
      const result = JSON.stringify(Generator.next().value);
      // assert
      expect(result).toBe(expectedResult);
    });
  });

  describe('fetchFlow', () => {
    it('should fork call to callFetchSaga with the correct parameters', () => {
      // act
      const result = fetchFlow().next().value;
      // assert
      expect(result.FORK).toBeDefined();
      expect(result.FORK.fn).toEqual(callFetchSaga);
      const arg = result.FORK.args[0];
      expect(arg).toHaveProperty('requestId', `${PAGE}Page`);
      expect(arg).toHaveProperty('fetchGenerator', expect.any(Function));
      expect(arg).toHaveProperty('parentId', `${MODULE}Module`);
      expect(arg).toHaveProperty('resolveSelector');
    });
  });
});
