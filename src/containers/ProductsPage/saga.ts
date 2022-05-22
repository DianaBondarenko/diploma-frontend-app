import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { ProductsService } from './service';
import { ProductsResponse } from './types';
import { mapProductsData } from './helpers';

interface GetProductsSagaParams {
  type: string;
  payload: string;
}

export function* getProductsBySearchValueSaga({payload}: GetProductsSagaParams) {
  try {
    const response: ProductsResponse = yield call(
      ProductsService.getProductsBySearchValue, payload
    );
    const products = mapProductsData(response.data);

    yield put(actions.getProductsBySearchValue.success(products));
  } catch (error) {
    yield put(actions.getProductsBySearchValue.error(error));
  }
}

export function* productsPageWatcherSaga() {
  yield all([
    takeLatest(actions.getProductsBySearchValue.REQUEST, getProductsBySearchValueSaga),
  ]);
}
