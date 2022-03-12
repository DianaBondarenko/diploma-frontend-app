import {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from 'react-phone-number-input';
import { LOCAL_STORAGE_KEY } from './constants';

/**
 * The function checks if localStorage is available.
 *
 * @returns boolean
 */
export const isLocalStorageAvailable = (): boolean => {
  if (typeof window !== 'undefined') {
    if (window.localStorage) {
      try {
        const testKey = 'testKey';
        const testValue = 'testValue';
        window.localStorage.setItem(testKey, testValue);
        const result = window.localStorage.getItem(testKey);
        if (result === testValue) {
          window.localStorage.removeItem(testKey);
          return true;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  return false;
};

/**
 * The function get properties from localStorage.
 *
 * @param key: string // property name
 * @returns property
 */
export const getFromLocalStorage = (key: string) => {
  if (isLocalStorageAvailable()) {
    const localObject = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
    );
    return key === LOCAL_STORAGE_KEY ? localObject : localObject[key];
  }
};

/**
 * The function set properties to localStorage.
 *
 * @param key: string // property key
 * @param item: any // property value
 */
export const setToLocalStorage = (key: string, item: any) => {
  if (isLocalStorageAvailable()) {
    const localObject = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
    );
    localObject[key] = item;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localObject));
  }
};

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
