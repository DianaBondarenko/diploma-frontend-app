import { createReducer } from '@reduxjs/toolkit';
import { OrderPageState } from './types';
import * as actions from './actions';
import { AppState, DeliveryType, PaymentMethod } from '../../global/types';
import {
  getCurrentOrder,
  updateOrder,
} from '../../global/helpers/localStorageHelper';

export const orderPageInitialState: OrderPageState = {
  orderPage: {
    order: getCurrentOrder() || {
      shopId: '',
      phoneNumber: '',
      products: [],
      paymentMethod: PaymentMethod.ON_DELIVERY,
      deliveryType: DeliveryType.PICK_UP,
    }
  },
};

const reducer = createReducer(orderPageInitialState, {
  [actions.setOrderData.type]: (state, action) => {
    state.orderPage.order = action.payload;
    updateOrder(action.payload);
  },
});

const orderPageOrderData = (state: AppState) =>
  state.orderPageReducer.orderPage.order;

const selectors = {
  orderPageOrderData,
};

export { selectors };
export default reducer;
