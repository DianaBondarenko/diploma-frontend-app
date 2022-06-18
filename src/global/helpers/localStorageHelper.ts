import { CART_KEY, LOCAL_STORAGE_KEY, ORDER_KEY } from '../constants';
import { Cart } from '../../containers/CartPage/types';
import { OrderData } from '../../containers/OrderPage/types';

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

export const getFromLocalStorage = (key: string) => {
  if (isLocalStorageAvailable()) {
    const localObject = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
    );
    return key === LOCAL_STORAGE_KEY ? localObject : localObject[key];
  }
};

export const setToLocalStorage = (key: string, item: any) => {
  if (isLocalStorageAvailable()) {
    const localObject = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '{}'
    );
    localObject[key] = item;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localObject));
  }
};

export const getCurrentCart = () => {
  if (isLocalStorageAvailable()) {
    return getFromLocalStorage(CART_KEY) || [];
  }
};

export const updateCart = (updatedCart: Cart) => {
  setToLocalStorage(CART_KEY, updatedCart);
};

export const getCurrentOrder = () => {
  if (isLocalStorageAvailable()) {
    return getFromLocalStorage(ORDER_KEY) || [];
  }
};

export const updateOrder = (updatedOrder: OrderData) => {
  setToLocalStorage(ORDER_KEY, updatedOrder);
};
