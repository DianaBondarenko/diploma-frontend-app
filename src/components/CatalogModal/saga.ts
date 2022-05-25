import { all, call, put, takeLatest } from 'redux-saga/effects';
import { CategoriesResponse } from './types';
import * as actions from './actions';
import { CategoriesService } from './service';
import { mapCategoriesData } from './helpers';

export function* getCategoriesSaga() {
  try {
    const response: CategoriesResponse = yield call(
      CategoriesService.getAllCategories
    );
    const categories = mapCategoriesData(response.data);

    yield put(actions.getCategories.success(categories));
  } catch (error) {
    yield put(actions.getCategories.error(error));
  }
}

export function* categoriesPageWatcherSaga() {
  yield all([takeLatest(actions.getCategories.REQUEST, getCategoriesSaga)]);
}
