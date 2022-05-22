import { useSelector } from 'react-redux';
import { selectors } from '../../containers/CartPage/reducer';

const useCheckIsProductInCart = (productId: string) => {
  const cartProducts = useSelector(selectors.cartPageProducts);

  if (cartProducts.find((el) => el.id === productId)) {
    return true;
  }
  return false;
};

export default useCheckIsProductInCart;
