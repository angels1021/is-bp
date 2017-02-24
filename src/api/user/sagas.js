import { takeLatest, put, call } from 'redux-saga/effects';
import { getUser } from '../../api';
import { productsLoaded, productsLoadedError } from './actions';
import { LOAD_PRODUCTS } from './constants';

// get
function* getProducts() {
  try {
    const response = yield call(getUser);
    yield put(productsLoaded(response.data));
  } catch (ex) {
    yield put(productsLoadedError(ex));
  }
}

// watcher
function* getProductsWatcher() {
  yield takeLatest(LOAD_PRODUCTS, getProducts);
}

// export []
export default [
  getProductsWatcher
];
