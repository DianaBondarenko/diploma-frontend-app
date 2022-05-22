import { useSelector } from 'react-redux';
import { selectors } from '../../containers/CartPage/reducer';

const useProductInCartCount = (productId: string) => {
  const cartProducts = useSelector(selectors.cartPageProducts);

  return cartProducts.find((el) => el.id === productId)?.countDesired || 0;
};

export default useProductInCartCount;
