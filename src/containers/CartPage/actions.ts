import { createAction } from '@reduxjs/toolkit';
import * as constants from './constants';
import { ProductInCartData } from './types';

export const addProduct = createAction<ProductInCartData>(
  constants.ADD_PRODUCT
);
export const deleteProduct = createAction<string>(constants.DELETE_PRODUCT);
export const updateProduct = createAction<{
  id: string;
  productInfo: ProductInCartData;
}>(constants.UPDATE_PRODUCT);
