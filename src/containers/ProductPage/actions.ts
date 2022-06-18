import { asyncActionsCreator } from '../../global/redux';
import * as constants from './constants';

export const getProductById = asyncActionsCreator(constants.GET_PRODUCT_BY_ID);
