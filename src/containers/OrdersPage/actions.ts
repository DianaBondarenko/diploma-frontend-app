import { asyncActionsCreator } from '../../global/redux';
import * as constants from './constants';

export const getOrders = asyncActionsCreator(constants.GET_ORDERS);
export const getOrdersRefresh = asyncActionsCreator(
  constants.GET_ORDERS_REFRESH
);
export const cancelOrder = asyncActionsCreator(constants.CANCEL_ORDER);
export const putCollectingStatus = asyncActionsCreator(
  constants.PUT_COLLECTING_STATUS
);
export const putReadyStatus = asyncActionsCreator(constants.PUT_READY_STATUS);
export const putCompletedStatus = asyncActionsCreator(
  constants.PUT_COMPLETED_STATUS
);
