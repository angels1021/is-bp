/**
 * fetchAll api actions
 */
import { FETCH_ALL } from './constants';
import { createRequestId } from './utils';
/**
 * action creator for a fetchAll request.
 * expects an options object
 *
 * @param {string} requestId           - unique page/module id to track in global async reducer
 * @param {generator} fetchGenerator   - generator to call when ready to fetch resources
 * @param {string} [parentId]          - unique page/module id to wait for before starting calls
 * @param {function} [resolveSelector] - selector function that must resolve to true before starting calls
 */
export const fetchAllCreateSaga = ({ requestId, fetchGenerator, parentId, resolveSelector }) => ({
  type: FETCH_ALL,
  payload: {
    requestId: createRequestId(requestId),
    parentId: createRequestId(parentId),
    fetchGenerator,
    resolveSelector
  }
});

/**
 * actions creator for fetchAll events
 * should be listened to in individual module/page sagas
 *
 * @param moduleId
 */
export const fetchAll = (moduleId) => ({
  type: createRequestId(moduleId),
  payload: { id: moduleId }
});

