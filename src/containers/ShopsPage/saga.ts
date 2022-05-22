import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { ShopsService } from './service';
import { ShopsResponse } from './types';
import { ProductInCartData } from '../CartPage/types';

interface GetShopsProposalsParams {
  type: string;
  payload: ProductInCartData[];
}

export function* getShopsProposalsSaga({ payload }: GetShopsProposalsParams) {
  try {
    const response: ShopsResponse = yield call(
      ShopsService.getShopsProposals,
      payload
    );
    const shops = response.data;

    yield put(actions.getShopsProposals.success(shops));
  } catch (error) {
    yield put(actions.getShopsProposals.error(error));
  }
}

export function* shopsPageWatcherSaga() {
  yield all([
    takeLatest(actions.getShopsProposals.REQUEST, getShopsProposalsSaga),
  ]);
}
