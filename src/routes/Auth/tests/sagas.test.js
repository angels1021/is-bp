/**
 * Test Auth module init sagas
 */
/* eslint-disable redux-saga/yield-effects */
import { put, fork, call } from 'redux-saga/effects';
import { getModuleLocale } from 'api';
import { changeLocaleSuccess, changeLocaleFail } from 'api/locale/actions';
import { fetchMessages } from 'api/fetchAll/utils';
import { PAGE, MODULE } from '../auth.messages';
import { AuthFetch } from '../sagas';

describe('Auth module sagas', () => {
  describe('AuthFetch', () => {
    let Generator;
    let localGenerator;
    beforeEach(() => {
      Generator = AuthFetch();
      // should call getModuleLocale api
      // arrange
      const expectedResult = call(getModuleLocale, MODULE);
      // act
      const result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });
    it('should set local reducer as failed locale on error', () => {
      // arrange
      const error = new Error('some error');
      const expectedResult = put(changeLocaleFail(error, MODULE));
      // act
      const result = Generator.next({ error }).value;
      // assert
      expect(result).toEqual(expectedResult);
    });
    it('should set local reducer as received locale on success', () => {
      // arrange
      // set progressing generator
      localGenerator = Generator;
      const response = 'en';
      const expectedResult = put(changeLocaleSuccess(response, MODULE));
      // act
      const result = localGenerator.next({ response }).value;
      // assert
      expect(result).toEqual(expectedResult);
    });
    it('should fork fetchResource saga with requestMessages action', () => {
      // arrange
      const messageRequest = [{ module: 'app', page: 'common' }, { module: MODULE, page: PAGE }];
      const response = 'en';
      const expectedResult = fork(fetchMessages, () => response, messageRequest);
      // act
      const result = localGenerator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });
  });
});
