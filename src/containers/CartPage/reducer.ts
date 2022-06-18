import { createReducer } from '@reduxjs/toolkit';
import { CartPageState } from './types';
import * as actions from './actions';
import { AppState } from '../../global/types';
import {
  getCurrentCart,
  updateCart,
} from '../../global/helpers/localStorageHelper';

const initialState: CartPageState = {
  cartPage: {
    products: getCurrentCart() || [],
  },
};

const reducer = createReducer(initialState, {
  [actions.addProduct.type]: (state, action) => {
    const updatedCartProducts = [...state.cartPage.products, action.payload];
    state.cartPage.products = updatedCartProducts;
    updateCart(updatedCartProducts);
  },
  [actions.deleteProduct.type]: (state, action) => {
    const updatedCartProducts = state.cartPage.products.filter(
      (el) => el.id !== action.payload
    );
    state.cartPage.products = updatedCartProducts;
    updateCart(updatedCartProducts);
  },
  [actions.updateProduct.type]: (state, action) => {
    const { id, productInfo } = action.payload;
    const updatedCartProducts = state.cartPage.products.map((el) =>
      el.id === id ? productInfo : el
    );
    state.cartPage.products = updatedCartProducts;
    updateCart(updatedCartProducts);
  },
  [actions.clearCart.type]: (state, action) => {
    state.cartPage.products = [];
    updateCart([]);
  },
});

const cartPageProducts = (state: AppState) =>
  state.cartPageReducer.cartPage.products;

const selectors = {
  cartPageProducts,
};

export { selectors };
export default reducer;
