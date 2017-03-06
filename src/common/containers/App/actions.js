/**
 * Global action creators
 */
import { FETCH_ALL, ASYNC_REQUEST, ASYNC_SUCCESS, ASYNC_FAIL } from './constants';

export const fetchAll = (moduleId) => ({
  type: FETCH_ALL(moduleId),
  payload: { id: moduleId }
});

export const asyncRequest = (id) => ({
  type: ASYNC_REQUEST,
  payload: { id }
});

export const asyncSuccess = (id) => ({
  type: ASYNC_SUCCESS,
  payload: { id }
});

export const asyncFail = (id, error) => ({
  type: ASYNC_FAIL,
  payload: { id, error }
});
