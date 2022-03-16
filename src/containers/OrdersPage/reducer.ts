import { createReducer } from '@reduxjs/toolkit';
import { OrdersPageState } from './types';
import * as actions from './actions';
import { AppState } from '../../global/types';

const initialState: OrdersPageState = {
  ordersPage: {
    data: null,
    loading: false,
    error: null,
  },
  ordersSearchModal: {
    data: null,
    loading: false,
    error: null,
  },
};

const reducer = createReducer(initialState, {
  [actions.getOrders.REQUEST]: (state) => {
    state.ordersPage.loading = true;
  },
  [actions.getOrders.ERROR]: (state, action) => {
    state.ordersPage.error = action.payload;
    state.ordersPage.loading = false;
  },
  [actions.getOrders.SUCCESS]: (state, action) => {
    state.ordersPage.data = action.payload;
    state.ordersPage.loading = false;
  },
  [actions.getOrdersRefresh.SUCCESS]: (state, action) => {
    state.ordersPage.data = action.payload;
  },
  [actions.getOrdersRefresh.ERROR]: (state, action) => {
    state.ordersPage.error = action.payload;
  },
  [actions.cancelOrder.REQUEST]: (state) => {
    state.ordersPage.loading = true;
  },
  [actions.cancelOrder.SUCCESS]: (state) => {
    state.ordersPage.loading = false;
  },
  [actions.cancelOrder.ERROR]: (state) => {
    state.ordersPage.loading = false;
  },
  [actions.putCompletedStatus.REQUEST]: (state) => {
    state.ordersPage.loading = true;
  },
  [actions.putCompletedStatus.SUCCESS]: (state) => {
    state.ordersPage.loading = false;
  },
  [actions.putCompletedStatus.ERROR]: (state) => {
    state.ordersPage.loading = false;
  },
  [actions.putReadyStatus.REQUEST]: (state) => {
    state.ordersPage.loading = true;
  },
  [actions.putReadyStatus.SUCCESS]: (state) => {
    state.ordersPage.loading = false;
  },
  [actions.putReadyStatus.ERROR]: (state) => {
    state.ordersPage.loading = false;
  },
  [actions.putCollectingStatus.REQUEST]: (state) => {
    state.ordersPage.loading = true;
  },
  [actions.putCollectingStatus.ERROR]: (state) => {
    state.ordersPage.loading = false;
  },
  [actions.putCollectingStatus.SUCCESS]: (state) => {
    state.ordersPage.loading = false;
  },
});

const ordersPageLoading = (state: AppState) =>
  state.ordersPageReducer.ordersPage.loading;
const ordersPageError = (state: AppState) =>
  state.ordersPageReducer.ordersPage.error;
const ordersPageData = (state: AppState) =>
  state.ordersPageReducer.ordersPage.data;

const selectors = {
  ordersPageLoading,
  ordersPageError,
  ordersPageData,
};

export { selectors };
export default reducer;
