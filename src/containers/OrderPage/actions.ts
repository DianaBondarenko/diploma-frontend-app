import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';
import { OrderData } from './types';

export const setOrderData = createAction<OrderData>(constants.SET_ORDER_DATA);
export const clearOrderData = createAction(constants.CLEAR_ORDER_DATA);
