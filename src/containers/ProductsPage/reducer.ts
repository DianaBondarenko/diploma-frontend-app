import { createReducer } from '@reduxjs/toolkit';
import { ProductsPageState } from './types';
import * as actions from './actions';
import { AppState } from '../../global/types';

const initialState: ProductsPageState = {
  productsPage: {
    data: null,
    loading: false,
    error: null,
  },
};

const reducer = createReducer(initialState, {
  [actions.getProductsBySearchValue.REQUEST]: (state) => {
    state.productsPage.loading = true;
  },
  [actions.getProductsBySearchValue.ERROR]: (state, action) => {
    state.productsPage.error = action.payload;
    state.productsPage.loading = false;
  },
  [actions.getProductsBySearchValue.SUCCESS]: (state, action) => {
    state.productsPage.data = action.payload;
    state.productsPage.loading = false;
  },
});

const productsPageLoading = (state: AppState) =>
  state.productsPageReducer.productsPage.loading;
const productsPageError = (state: AppState) =>
  state.productsPageReducer.productsPage.error;
const productsPageData = (state: AppState) =>
  state.productsPageReducer.productsPage.data;

const selectors = {
  productsPageLoading,
  productsPageError,
  productsPageData,
};

export { selectors };
export default reducer;
