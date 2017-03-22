/**
 * Test API Auth selectors
 */

import { testSelector } from 'utils/testing/selectors';
import {
  selectUser,
  selectUserId,
  selectAuthenticated
} from '../selectors';

const storeModel = {
  auth: {
    user: {
      id: '1',
      uuid: '234',
      role: 'admin',
      firstName: 'Tom',
      lastName: 'Fletcher'
    },
    error: false,
    pending: false,
    isLoggedIn: false
  }
};

describe('API Auth selectors', () => {
  describe(
    'selectUser',
    testSelector(selectUser(), ['auth', 'user'], storeModel)
  );
  describe(
    'selectUserId',
    testSelector(selectUserId(), ['auth', 'user', 'id'], storeModel)
  );
  describe(
    'selectAuthenticated',
    testSelector(selectAuthenticated(), ['auth', 'isLoggedIn'], storeModel)
  );
});
