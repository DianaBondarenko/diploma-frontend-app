import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { OrdersService } from './service';
import { OrderData, OrdersResponse, ProductsResponse } from './types';
import { mapDataForOrdersPageTable } from './helpers';

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

export function* ordersPageWatcherSaga() {
  yield all([
    takeLatest(actions.getOrders.REQUEST, getOrdersSaga),
    takeLatest(actions.getOrdersRefresh.REQUEST, getOrdersRefreshSaga),
  ]);
}
