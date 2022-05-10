import { createReducer } from '@reduxjs/toolkit';
import { CartPageState } from './types';
import * as actions from './actions';
import { AppState } from '../../global/types';

const initialState: CartPageState = {
  cartPage: {
    data: null,
    loading: false,
    error: null,
  },
};

const reducer = createReducer(initialState, {});
//
// const productsPageLoading = (state: AppState) =>
//   state.productsPageReducer.productsPage.loading;
// const productsPageError = (state: AppState) =>
//   state.productsPageReducer.productsPage.error;
// const productsPageData = (state: AppState) =>
//   state.productsPageReducer.productsPage.data;

const selectors = {
  // productsPageLoading,
  // productsPageError,
  // productsPageData,
};

export { selectors };
export default reducer;
