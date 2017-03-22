import fs from 'fs';
import { get as getIn } from 'lodash';
import { get, put } from './request';
import appModules from '../../translations/extractedMessages/extractedModules.json';

export const getUserById = (id) => get(`/users/${id}`);

export const getUserByUsername = (username) => get('/users/', { username });

export const changeUser = (id, data) => (
  getUserById(id).then((user) => {
    if (user) {
      delete data.id; // eslint-disable-line no-param-reassign
      delete data.uuid; // eslint-disable-line no-param-reassign
      const changed = { ...user, ...data };
      delete changed.id;
      return put(`/users/${id}`, changed);
    }
    return Promise.reject(new Error(`user ${id} not found`));
  })
);

export const setUserToken = (userId, token) => changeUser(userId, { token })
  .then((user) => ({ user, token }));

export const getLocale = (locale, { module, page }) => new Promise((resolve, reject) => {
  const pageMessages = getIn(appModules, [module, page], false);
  if (!pageMessages) {
    resolve({});
  }
  fs.readFile(
      `internals/translations/locales/${locale}.json`,
      (error, value) => {
        if (error) {
          reject(error);
        } else {
          const json = JSON.parse(value);
          const ids = Object.keys(pageMessages);
          const messages = Object.keys(json)
            .filter((item) => ids.includes(item))
            .reduce((collection, id) => {
              collection[id] = json[id]; // eslint-disable-line no-param-reassign
              return collection;
            }, {});
          resolve({ module, page, messages });
        }
      }
    );
});

