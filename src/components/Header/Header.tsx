import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors as cartSelectors } from '../../containers/CartPage/reducer';
import logo from '../../global/media/logo.svg';
import styles from './Header.module.scss';
import { CART_ROUTE, HOME_ROUTE } from '../../global/constants';
import { ReactComponent as CartIcon } from '../../global/media/cart.svg';
import { ReactComponent as CatalogIcon } from '../../global/media/catalog.svg';
import Badge from '../Badge';
import CatalogModal from '../CatalogModal';
import SearchBar from './components/SearchBar';

const Header = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const params = new URLSearchParams(useLocation().search);
  const searchValueFromUrl = params.get('search');

  const products = useSelector(cartSelectors.cartPageProducts);
  const productsInCartCount = products.length;
  let timer: any;

  const [searchValue, setSearchValue] = useState<string>('');
  const [startAnimation, setStartAnimation] = useState<boolean>();
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setStartAnimation(true);
    timer = setTimeout(() => {
      setStartAnimation(false);
    }, 500);
    return () => clearInterval(timer);
  }, [productsInCartCount]);

  useEffect(() => {
    if (searchValueFromUrl) {
      setSearchValue(searchValueFromUrl);
    }
  }, [searchValueFromUrl]);

  const handleHomeClick = () => {
    history.push(HOME_ROUTE);
  };

  const handleCatalogClick = () => {
    setIsCatalogModalOpen(true);
  };

  const handleCartClick = () => {
    history.push(CART_ROUTE);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.content}>
        <div className={styles.leftBlock}>
          <div onClick={handleHomeClick}>
            <img src={logo} alt="header logo" className={styles.logo} />
          </div>
        </div>
        <div className={styles.centralBlock}>
          <div className={styles.buttonCatalog} onClick={handleCatalogClick}>
            <CatalogIcon />
            <div className={styles.buttonCatalogText}>
              {t('Header.CATALOG')}
            </div>
          </div>
          <div className={styles.searchBar}>
            <SearchBar value={searchValue} setValue={setSearchValue} />
          </div>
        </div>
        <div className={styles.rightBlock}>
          <div
            className={`${styles.buttonCart} ${
              productsInCartCount > 0 && styles.buttonCartWithCount
            }`}
            onClick={handleCartClick}
          >
            {productsInCartCount > 0 ? (
              <Badge
                badgeContent={productsInCartCount}
                isBadgeAnimationActive={startAnimation}
              >
                <CartIcon
                  onClick={handleCartClick}
                  className={styles.cartIcon}
                />
              </Badge>
            ) : (
              <CartIcon onClick={handleCartClick} className={styles.cartIcon} />
            )}
            {t('Header.CART')}
          </div>
        </div>
      </div>
      {isCatalogModalOpen && (
        <CatalogModal onModalClose={() => setIsCatalogModalOpen(false)} />
      )}
    </div>
  );
};

export default Header;
