export const capitalizeFirstLetter = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

export const sortByAlphabet = (x: any, y: any) => {
  return x.name.localeCompare(y.name);
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
