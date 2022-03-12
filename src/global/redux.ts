import { createAction } from '@reduxjs/toolkit';

interface ActionType {
  REQUEST: string;
  SUCCESS: string;
  ERROR: string;
  // eslint-disable-next-line
  request: (payload?: any) => any;
  // eslint-disable-next-line
  success: (payload?: any) => any;
  // eslint-disable-next-line
  error: (payload?: any) => any;
}

/**
 * Use this helper function to generate actions and types automatically
 * This will return a object generating 3 actions and 3 types:
 * @param {string} action (@example "GET_DATA")
 * @returns {object} @example {
 *   REQUEST: "GET_DATA_REQUEST",
 *   SUCCESS: "GET_DATA_SUCCESS",
 *   ERROR: "GET_DATA_ERROR",
 *   request: payload => ({ type, payload, }), // type: GET_DATA_REQUEST
 *   success: payload => ({ type, payload, }), // type: GET_DATA_SUCCESS
 *   error: payload => ({ type, payload, }), // type: GET_DATA_ERROR
 * }
 */
export const asyncActionsCreator = (action: string) => {
  const values = ['SUCCESS', 'ERROR', 'REQUEST'];
  const types = values.reduce((acc, value) => {
    const type = `${action}_${value}`;
    // @ts-ignore
    acc[value] = type;
    // @ts-ignore
    acc[value.toLowerCase()] = createAction(type);
    return acc;
  }, {});
  return types as ActionType;
};
