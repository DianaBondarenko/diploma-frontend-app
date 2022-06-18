import { createReducer } from '@reduxjs/toolkit';
import { ProductPageState } from './types';
import * as actions from './actions';
import { AppState } from '../../global/types';

const initialState: ProductPageState = {
  productPage: {
    data: null,
    loading: false,
    error: null,
  },
};

const reducer = createReducer(initialState, {
  [actions.getProductById.REQUEST]: (state) => {
    state.productPage.loading = true;
  },
  [actions.getProductById.ERROR]: (state, action) => {
    state.productPage.error = action.payload;
    state.productPage.loading = false;
  },
  [actions.getProductById.SUCCESS]: (state, action) => {
    state.productPage.data = action.payload;
    state.productPage.loading = false;
  },
});

const productPageLoading = (state: AppState) =>
  state.productPageReducer.productPage.loading;
const productPageError = (state: AppState) =>
  state.productPageReducer.productPage.error;
const productPageData = (state: AppState) =>
  state.productPageReducer.productPage.data;

const selectors = {
  productPageLoading,
  productPageError,
  productPageData,
};

export { selectors };
export default reducer;
