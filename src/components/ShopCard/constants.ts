import { getProductsCount } from '../../global/helpers';

export const ECONOMY_TEXT = (value: number | string) =>
  `Ви економите ${value}грн`;
export const UNAVAILABLE_TEXT = (countDesired: number, count: number) => {
  const missingCount = countDesired - count;
  return `${missingCount > 1 ? 'Відсутні' : 'Відсутній'} ${getProductsCount(
    missingCount
  )}`;
};
