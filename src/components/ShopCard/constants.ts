import { getProductsCount } from '../../global/helpers';

export const UNAVAILABLE_TEXT = (countDesired: number, count: number) => {
  const missingCount = countDesired - count;
  return `${missingCount > 1 ? 'Відсутні' : 'Відсутній'} ${getProductsCount(
    missingCount
  )}`;
};
