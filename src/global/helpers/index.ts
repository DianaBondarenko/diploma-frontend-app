import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from 'react-phone-number-input';

/**
 * The function checks and formats phone number
 *
 * @param phone: string
 */
export const formatPhoneNumberToBeValid = (phone: string) => {
  const formatted = phone;
  if (isValidPhoneNumber(phone)) {
    return formatted;
  }
  if (isValidPhoneNumber(`+7${phone}`)) {
    return `+7${phone}`;
  }
  if (isValidPhoneNumber(`+${phone}`)) {
    return `+${phone}`;
  }
  return null;
};

/**
 * The function formats phone number to have 11 symbols length
 *
 * @param phone: string
 */
export const formatPhoneNumberForRequest = (phone: string) => {
  const formattedValid = formatPhoneNumberToBeValid(phone);
  if (formattedValid) {
    const formatted = formatPhoneNumber(formattedValid);
    const formattedIntl = formatPhoneNumberIntl(formattedValid);
    if (formatted.length === 11) {
      return formatted;
    }
    if (formattedIntl.length === 11) {
      return formattedIntl;
    }
    if (formattedValid.length > 11 && formattedValid.length < 14) {
      return formattedValid.slice(formattedValid.length - 11);
    }
  }
  return null;
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

export const getProductsCount = (count: number) => {
  if (count > 20 || count <= 4) {
    const splitCount = count.toString().split('');
    const lastDigit = Number(splitCount[splitCount.length - 1]);
    if (lastDigit === 1) {
      return `${count} товар`;
    }
    if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
      return `${count} товари`;
    }
  }
  return `${count} товарів`;
};
