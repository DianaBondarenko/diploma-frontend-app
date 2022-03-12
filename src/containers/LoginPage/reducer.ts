import { createReducer } from '@reduxjs/toolkit';
import { getFromLocalStorage } from '../../global/helpers';
import { AppState } from '../../global/types';
import { LoginState } from './types';
import * as actions from './actions';

const initialState: LoginState = {
  error: null,
  loading: false,
  accessToken: getFromLocalStorage('accessToken') || null,
  refreshToken: getFromLocalStorage('refreshToken') || null,
};

const reducer = createReducer(initialState, {
  [actions.getValidationCode.SUCCESS]: (state) => {
    state.error = null;
  },
  [actions.auth.REQUEST]: (state) => {
    state.loading = true;
  },
  [actions.auth.ERROR]: (state, action) => {
    state.error = action.payload.message;
    state.loading = false;
  },
  [actions.auth.SUCCESS]: (state, action) => {
    state.accessToken = action.payload.access_token;
    state.refreshToken = action.payload.refresh_token;
    state.loading = false;
  },
  [actions.logout.type]: (state) => {
    state.accessToken = null;
    state.refreshToken = null;
  },
  [actions.loginClearError.type]: (state) => {
    state.error = null;
  },
});

const error = (state: AppState) => state.loginReducer.error;
const loading = (state: AppState) => state.loginReducer.loading;
const accessToken = (state: AppState) => state.loginReducer.accessToken;
const refreshToken = (state: AppState) => state.loginReducer.refreshToken;

const selectors = {
  error,
  loading,
  accessToken,
  refreshToken,
};

export { selectors };
export default reducer;
