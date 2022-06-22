import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CART_ROUTE } from '../../global/constants';
import { selectors } from './reducer';
import * as actions from './actions';
import * as cartActions from '../CartPage/actions';
import styles from './ProductPage.module.scss';
import Loader from '../../components/Loader';
import ProductBreadCrumbs from '../../components/Breadcrumbs/ProductBreadCrumbs';
import useCheckIsProductInCart from '../../global/hooks/useCheckIsProductInCart';
import GeneralProductCard from '../../components/GeneralProductCard';

const ProductPage = ({ match }: RouteComponentProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  // @ts-ignore
  const { productId } = match.params;
  const params = new URLSearchParams(useLocation().search);
  const isFromCart = params.get('fromCart') === 'true';
  const isAddedToCart = useCheckIsProductInCart(productId);
  const loading = useSelector(selectors.productPageLoading);
  const product = useSelector(selectors.productPageData);

  useEffect(() => {
    if (productId) {
      dispatch(actions.getProductById.request(productId));
    }
  }, []);

  const handleCartClick = () => {
    if (isAddedToCart) {
      dispatch(cartActions.deleteProduct(productId));
    } else {
      dispatch(
        cartActions.addProduct({
          ...product!,
          countDesired: 1,
        })
      );
    }
  };

  const buttonText = isAddedToCart
    ? t('ProductPage.ACTIVE_BUTTON_TEXT')
    : t('ProductPage.INACTIVE_BUTTON_TEXT');

  const pageContent = (
    <>
      {product && (
        <>
          <ProductBreadCrumbs
            productName={product.name}
            isFromCart={isFromCart}
          />
          <div className={styles.generalContainer}>
            <GeneralProductCard
              {...product}
              handleButtonClick={handleCartClick}
              buttonText={buttonText}
            />
          </div>
        </>
      )}
    </>
  );

  return (
    <div className={styles.mainContainer}>
      {loading ? <Loader /> : pageContent}
    </div>
  );
};

export default ProductPage;
