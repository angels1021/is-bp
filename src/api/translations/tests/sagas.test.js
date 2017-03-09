/**
 * Test sagas for translations api
 */
/* eslint-disable redux-saga/yield-effects */
import { fork, takeEvery, call, put, select } from 'redux-saga/effects';
import { getLocale } from '../../../api';
import { MESSAGES_REQUEST } from '../constants';
import { messageSuccess, messagesError } from '../actions';
import { selectNewRequest } from '../selectors';
import { watchMessagesFlow, callGetMassages, getMessages } from '../sagas';

describe('API translations sagas', () => {
  describe('getMessagesFlow', () => {
    it('should listen for the latest call to MESSAGES_REQUEST', () => {
      // assert
      const Generator = watchMessagesFlow();
      const expectedResult = fork(takeEvery, MESSAGES_REQUEST, callGetMassages);
      // act
      const result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('callGetMassages', () => {
    // assert
    let Generator;
    const action = {
      payload: {
        locale: 'en',
        request: [{ module: 'app', page: 'common' }, { module: 'ms', page: 'settings' }]
      }
    };

    beforeEach(() => {
      // arrange
      Generator = callGetMassages(action);
      const expectedResult = JSON.stringify(select(selectNewRequest()));
      // act
      const result = JSON.stringify(Generator.next().value);
      // assert
      expect(result).toEqual(expectedResult);
    });

    // request array can be empty or full, we'll check bothh cases
    // no new request
    it('should resolve the saga if requested messages already exist', () => {
      // assert
      const request = [];
      const expectedResult = put(messageSuccess([]));
      // act
      const result = Generator.next(request).value;
      // assert
      expect(result).toEqual(expectedResult);
    });
    // has new requests
    it('should call getMessages saga if new requests exist', () => {
      // arrange
      const { locale, request } = action.payload;
      const expectedResult = call(getMessages, locale, request);
      // act
      const result = Generator.next(request).value;
      // assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getMessages', () => {
    // assert
    let Generator;
    const locale = 'en';
    const request = [{ module: 'ms', page: 'settings' }];

    beforeEach(() => {
      // arrange
      Generator = getMessages(locale, request);
      const expectedResult = call(getLocale, locale, request);
      // act
      const result = Generator.next().value;
      // assert
      expect(result).toEqual(expectedResult);
    });

    // check both error, success and empty response scenarios
    // error
    it('should call getLocale api and return error if response contains an error property', () => {
      // arrange
      const response = { error: new Error('some error') };
      const expectedResult = put(messagesError(response.error));
      // act
      const result = Generator.next(response).value;
      // assert
      expect(result).toEqual(expectedResult);
    });

    it(`should call getLocale api and return the response and requested locale, 
      if response contains a response property`, () => {
      // arrange
      const response = { response: [{ module: 'ms', page: 'settings', messages: { a: 1 } }] };
      const expectedResult = put(messageSuccess(locale, response.response));
      // act
      const result = Generator.next(response).value;
      // assert
      expect(result).toEqual(expectedResult);
    });

    it('should return an error if response contains no error and no response', () => {
      // arrange
      const response = {};
      const notFound = new Error(`no translations found for ${locale} and ${JSON.stringify(request)}`);
      const expectedResult = put(messagesError(notFound));
      // act
      const result = Generator.next(response).value;
      // assert
      expect(result).toEqual(expectedResult);
    });
  });
});
