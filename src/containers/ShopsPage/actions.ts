import { asyncActionsCreator } from '../../global/redux';
import * as constants from './constants';

export const getShopsProposals = asyncActionsCreator(
  constants.GET_SHOPS_PROPOSALS
);
