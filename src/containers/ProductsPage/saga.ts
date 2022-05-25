import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { ProductsResponse } from './types';
import { CategoryByIdResponse } from '../../components/CatalogModal/types';
import { ProductsService } from './service';
import { CategoriesService } from '../../components/CatalogModal/service';
import { mapProductsData } from './helpers';

interface GetProductsSagaParams {
  type: string;
  payload: string;
}

export function* getProductsBySearchValueSaga({
  payload,
}: GetProductsSagaParams) {
  try {
    const response: ProductsResponse = yield call(
      ProductsService.getProductsBySearchValue,
      payload
    );
    const products = mapProductsData(response.data);

    yield put(actions.getProductsBySearchValue.success(products));
  } catch (error) {
    yield put(actions.getProductsBySearchValue.error(error));
  }
}

export function* getProductsByCategoryIdSaga({
  payload,
}: GetProductsSagaParams) {
  try {
    const response: CategoryByIdResponse = yield call(
      CategoriesService.getCategoryById,
      payload
    );
    const products = mapProductsData(response.data.products);

    yield put(actions.getProductsByCategoryId.success(products));
  } catch (error) {
    yield put(actions.getProductsByCategoryId.error(error));
  }
}

export function* productsPageWatcherSaga() {
  yield all([
    takeLatest(
      actions.getProductsBySearchValue.REQUEST,
      getProductsBySearchValueSaga
    ),
    takeLatest(
      actions.getProductsByCategoryId.REQUEST,
      getProductsByCategoryIdSaga
    ),
  ]);
}
