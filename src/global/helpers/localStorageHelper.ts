import { CART_KEY, LOCAL_STORAGE_KEY } from '../constants';
import { Cart } from '../../containers/CartPage/types';

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
 * The function gets current cart from localStorage.
 *
 * @returns cart object or null
 */
export const getCurrentCart = () => {
  if (isLocalStorageAvailable()) {
    return getFromLocalStorage(CART_KEY) || [];
  }
};

/**
 * The function updates current cart in localStorage.
 *
 * @param updatedCart: Cart // new cart object
 */
export const updateCart = (updatedCart: Cart) => {
  setToLocalStorage(CART_KEY, updatedCart);
};
