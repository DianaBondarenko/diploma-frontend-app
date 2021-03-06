import { asyncActionsCreator } from '../../global/redux';
import * as constants from './constants';

export const getProductsBySearchValue = asyncActionsCreator(
  constants.GET_PRODUCTS_BY_SEARCH_VALUE
);
