import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { OrdersService } from './service';
import { OrdersResponse } from './types';

export function* getOrdersSaga() {
  try {
    const response: OrdersResponse = yield call(OrdersService.getOrders);
    // TODO: map data from response
    console.log(response);
    yield put(actions.getOrders.success(response));
  } catch (error) {
    yield put(actions.getOrders.error(error));
  }
}

export function* ordersPageWatcherSaga() {
  yield all([takeLatest(actions.getOrders.REQUEST, getOrdersSaga)]);
}
