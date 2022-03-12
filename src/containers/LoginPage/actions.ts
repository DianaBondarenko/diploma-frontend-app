import { createAction } from '@reduxjs/toolkit';
import { asyncActionsCreator } from '../../global/redux';
import * as constants from './constants';

export const auth = asyncActionsCreator(constants.AUTH);
export const getValidationCode = asyncActionsCreator(
  constants.GET_VALIDATION_CODE
);
export const logout = createAction(constants.LOGOUT);
export const loginClearError = createAction(constants.LOGIN_CLEAR_ERROR);
