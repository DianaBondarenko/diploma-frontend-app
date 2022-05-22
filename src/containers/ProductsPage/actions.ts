import { createAction } from '@reduxjs/toolkit';
import { asyncActionsCreator } from '../../global/redux';
import * as constants from './constants';

// export const getProductsBySearchValue = createAction(constants.GET_PRODUCTS, (searchValue) => ({searchValue}));
// export const getProductsBySearchValue = (searchValue: string) => createAction(constants.GET_PRODUCTS,
//     {searchValue});

export const getProductsBySearchValue = asyncActionsCreator(
  constants.GET_PRODUCTS
);
