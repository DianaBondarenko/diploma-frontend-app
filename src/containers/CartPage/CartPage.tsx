import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors } from './reducer';
import { getProductsCount } from '../../global/helpers';
import styles from './CartPage.module.scss';
import ProductCard from '../../components/ProductCard';
import { ProductCardVariant } from '../../components/ProductCard/ProductCard';
import DeliveryPayBanner from '../../components/DeliveryPayBanner';
import CartBreadCrumbs from '../../components/Breadcrumbs/CartBreadCrumbs';

const CartPage = () => {
  const { t } = useTranslation();

  const products = useSelector(selectors.cartPageProducts);
  const productsInCartCount = products.length;

  return (
    <div className={styles.mainContainer}>
      <CartBreadCrumbs />
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.headerText}>{t('CartPage.TITLE_TEXT')}</div>
          <div className={styles.subheaderText}>
            {t('CartPage.SUBTITLE_TEXT')}{' '}
            {getProductsCount(productsInCartCount)}
          </div>
        </div>
        {productsInCartCount > 0 ? (
          <div className={styles.cartContainer}>
            {Object.values(products)
              // ?.sort(sortByAlphabet)
              .map((item) => (
                <div key={item.id} className={styles.card}>
                  <ProductCard
                    variant={ProductCardVariant.CART}
                    {...item}
                    fromCart
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className={styles.contactBannerContainer}>ADD SMTH</div>
        )}
        <div className={styles.deliveryPayContainer}>
          <DeliveryPayBanner disabled={!productsInCartCount} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
