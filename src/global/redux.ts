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
