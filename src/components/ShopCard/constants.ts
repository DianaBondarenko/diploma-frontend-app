import { getProductsCount } from '../../global/helpers';

export const ECONOMY_TEXT = (value: number | string) =>
  `Вы экономите ${value}₸`;
export const UNAVAILABLE_TEXT = (countDesired: number, count: number) =>
  `Отсутствует ${getProductsCount(countDesired - count)}`;
