import { createReducer } from '@reduxjs/toolkit';
import { CategoriesPageState } from './types';
import * as actions from './actions';
import { AppState } from '../../global/types';

const initialState: CategoriesPageState = {
  categoriesPage: {
    data: null,
    loading: false,
    error: null,
  },
};

const reducer = createReducer(initialState, {
  [actions.getCategories.REQUEST]: (state) => {
    state.categoriesPage.loading = true;
  },
  [actions.getCategories.ERROR]: (state, action) => {
    state.categoriesPage.error = action.payload;
    state.categoriesPage.loading = false;
  },
  [actions.getCategories.SUCCESS]: (state, action) => {
    state.categoriesPage.data = action.payload;
    state.categoriesPage.loading = false;
  },
});

const categoriesPageLoading = (state: AppState) =>
  state.categoriesPageReducer.categoriesPage.loading;
const categoriesPageError = (state: AppState) =>
  state.categoriesPageReducer.categoriesPage.error;
const categoriesPageData = (state: AppState) =>
  state.categoriesPageReducer.categoriesPage.data;

const selectors = {
  categoriesPageLoading,
  categoriesPageError,
  categoriesPageData,
};

export { selectors };
export default reducer;
