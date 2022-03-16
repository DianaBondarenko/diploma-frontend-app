import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { OrdersService } from './service';
import { OrderData, OrdersResponse, ProductsResponse } from './types';
import { mapDataForOrdersPageTable } from './helpers';

interface StatusChangeSagasParams {
  type: string;
  payload: { id: string };
}

export function* getOrdersSaga() {
  try {
    const response: OrdersResponse = yield call(OrdersService.getOrders);
    const productsSku = [
      // @ts-ignore
      ...new Set(
        response.result.reduce((accum: any, item: { order: OrderData }) => {
          const itemProductsSku = item.order.items.map(
            (product) => product.sku
          );
          return [...accum, ...itemProductsSku];
        }, [])
      ),
    ];
    const productsResponse: ProductsResponse = yield call(
      OrdersService.getProductsBySkus,
      productsSku
    );
    const mappedData = mapDataForOrdersPageTable(
      response.result,
      productsResponse.items
    );
    yield put(actions.getOrders.success(mappedData));
  } catch (error) {
    yield put(actions.getOrders.error(error));
  }
}

export function* getOrdersRefreshSaga() {
  try {
    const response: OrdersResponse = yield call(OrdersService.getOrders);
    const productsSku = [
      // @ts-ignore
      ...new Set(
        response.result.reduce((accum: any, item: { order: OrderData }) => {
          const itemProductsSku = item.order.items.map(
            (product) => product.sku
          );
          return [...accum, ...itemProductsSku];
        }, [])
      ),
    ];
    const productsResponse: ProductsResponse = yield call(
      OrdersService.getProductsBySkus,
      productsSku
    );
    const mappedData = mapDataForOrdersPageTable(
      response.result,
      productsResponse.items
    );
    yield put(actions.getOrdersRefresh.success(mappedData));
  } catch (error) {
    yield put(actions.getOrdersRefresh.error(error));
  }
}

export function* cancelOrderSaga({ payload }: StatusChangeSagasParams) {
  try {
    console.log('cancel', payload.id);
    // TODO: request for cancel order
    yield put(actions.getOrdersRefresh.request());
    yield put(actions.cancelOrder.success());
  } catch (error) {
    yield put(actions.cancelOrder.error(error));
  }
}

export function* putCollectingStatusSaga({ payload }: StatusChangeSagasParams) {
  try {
    console.log('collecting', payload.id);
    // TODO: request for collecting status set
    yield put(actions.getOrdersRefresh.request());
    yield put(actions.putCollectingStatus.success());
  } catch (error) {
    yield put(actions.putCollectingStatus.error(error));
  }
}

export function* putReadyStatusSaga({ payload }: StatusChangeSagasParams) {
  try {
    console.log('ready', payload.id);
    // TODO: request for ready status set
    yield put(actions.getOrdersRefresh.request());
    yield put(actions.putReadyStatus.success());
  } catch (error) {
    yield put(actions.putReadyStatus.error(error));
  }
}

export function* putCompletedStatus({ payload }: StatusChangeSagasParams) {
  try {
    console.log('completed', payload.id);
    // TODO: request for completed status set
    yield put(actions.getOrdersRefresh.request());
    yield put(actions.putCompletedStatus.success());
  } catch (error) {
    yield put(actions.putCompletedStatus.error(error));
  }
}

export function* ordersPageWatcherSaga() {
  yield all([
    takeLatest(actions.getOrders.REQUEST, getOrdersSaga),
    takeLatest(actions.getOrdersRefresh.REQUEST, getOrdersRefreshSaga),
    takeLatest(actions.cancelOrder.REQUEST, cancelOrderSaga),
    takeLatest(actions.putCollectingStatus.REQUEST, putCollectingStatusSaga),
    takeLatest(actions.putReadyStatus.REQUEST, putReadyStatusSaga),
    takeLatest(actions.putCompletedStatus.REQUEST, putCompletedStatus),
  ]);
}
