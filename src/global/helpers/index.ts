/**
 * The function formats string's first letter to upper case
 *
 * @param string: {string}
 *
 * @returns {string}
 */
export const capitalizeFirstLetter = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

export const sortByAlphabet = (x: any, y: any) => {
  return x.name.localeCompare(y.name);
};

/**
 * The function converts date to DD.MM.YY HH:MM format
 *
 * @param time: {string}
 */
export const formatTime = (time: string) => {
  const date = new Date(time);
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const year = date.getFullYear();
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const minutes =
    date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const getLastDigit = (number: number) => {
  const splitCount = number.toString().split('');
  return Number(splitCount[splitCount.length - 1]);
};

export const getProductsCount = (count: number) => {
  if (count > 20 || count <= 4) {
    const lastDigit = getLastDigit(count);
    if (lastDigit === 1) {
      return `${count} товар`;
    }
    if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
      return `${count} товари`;
    }
  }
  return `${count} товарів`;
};

export const getProposalsCount = (count: number) => {
  const lastDigit = getLastDigit(count);
  return `Знайдено в ${lastDigit === 1 ? '1 магазині' : `${count} магазинах`}`;
};
