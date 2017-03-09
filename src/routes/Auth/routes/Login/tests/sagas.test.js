/**
 * Test Login init sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { fork } from 'redux-saga/effects';
import { fetchMessages } from 'api/fetchAll/utils';
import { PAGE, MODULE } from '../login.messages';
import { selectLocale } from '../../../selectors';
import { loginFetch } from '../sagas';

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
});
