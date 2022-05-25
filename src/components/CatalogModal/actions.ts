import { asyncActionsCreator } from '../../global/redux';
import * as constants from './constants';

export const getCategories = asyncActionsCreator(constants.GET_CATEGORIES);
