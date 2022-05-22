import { createReducer } from '@reduxjs/toolkit';
import { ShopsPageState } from './types';
import * as actions from './actions';
import { AppState } from '../../global/types';

const initialState: ShopsPageState = {
  shopsPage: {
    data: null,
    loading: false,
    error: null,
  },
};

const reducer = createReducer(initialState, {
  [actions.getShopsProposals.REQUEST]: (state) => {
    state.shopsPage.loading = true;
  },
  [actions.getShopsProposals.ERROR]: (state, action) => {
    state.shopsPage.error = action.payload;
    state.shopsPage.loading = false;
  },
  [actions.getShopsProposals.SUCCESS]: (state, action) => {
    state.shopsPage.data = action.payload;
    state.shopsPage.loading = false;
  },
});

const shopsPageLoading = (state: AppState) =>
  state.shopsPageReducer.shopsPage.loading;
const shopsPageError = (state: AppState) =>
  state.shopsPageReducer.shopsPage.error;
const shopsPageData = (state: AppState) =>
  state.shopsPageReducer.shopsPage.data;

const selectors = {
  shopsPageLoading,
  shopsPageError,
  shopsPageData,
};

export { selectors };
export default reducer;
