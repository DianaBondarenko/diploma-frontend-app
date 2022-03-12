import { asyncActionsCreator } from '../../global/redux';
import * as constants from './constants';

export const getOrders = asyncActionsCreator(constants.GET_ORDERS);
