import { get, put } from './request';

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

export const setUserToken = (userId, token) => changeUser(userId, { token });
