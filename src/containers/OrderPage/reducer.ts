import { createReducer } from '@reduxjs/toolkit';
import { OrderPageState } from './types';
import * as actions from './actions';
import { AppState, DeliveryType, PaymentMethod } from '../../global/types';
import {
  getCurrentOrder,
  updateOrder,
} from '../../global/helpers/localStorageHelper';

const orderInitialState = {
  shopId: '',
  products: [],
  deliveryType: DeliveryType.PICK_UP,
};
export const orderPageInitialState: OrderPageState = {
  orderPage: {
    order: getCurrentOrder() || orderInitialState,
  },
};

const reducer = createReducer(orderPageInitialState, {
  [actions.setOrderData.type]: (state, action) => {
    state.orderPage.order = action.payload;
    updateOrder(action.payload);
  },
  [actions.clearOrderData.type]: (state, action) => {
    state.orderPage.order = orderInitialState;
    updateOrder(orderInitialState);
  },
});

const orderPageOrderData = (state: AppState) =>
  state.orderPageReducer.orderPage.order;

const selectors = {
  orderPageOrderData,
};

export { selectors };
export default reducer;
