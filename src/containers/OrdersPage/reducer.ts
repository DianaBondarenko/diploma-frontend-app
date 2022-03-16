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
