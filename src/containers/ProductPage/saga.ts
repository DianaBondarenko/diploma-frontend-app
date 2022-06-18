import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { ProductResponse } from './types';
import { ProductsService } from './service';
import { mapProductData } from './helpers';

interface GetProductSagaParams {
  type: string;
  payload: string;
}

export function* getProductByIdSaga({ payload }: GetProductSagaParams) {
  try {
    const response: ProductResponse = yield call(
      ProductsService.getProductById,
      payload
    );
    const product = mapProductData(response.data);

    yield put(actions.getProductById.success(product));
  } catch (error) {
    yield put(actions.getProductById.error(error));
  }
}

export function* productPageWatcherSaga() {
  yield all([takeLatest(actions.getProductById.REQUEST, getProductByIdSaga)]);
}
