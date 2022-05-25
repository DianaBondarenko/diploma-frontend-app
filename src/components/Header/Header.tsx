import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as actions from '../../containers/LoginPage/actions';
import { selectors } from '../../containers/LoginPage/reducer';
import { selectors as cartSelectors } from '../../containers/CartPage/reducer';
import logo from '../../global/media/logo.svg';
// import searchIcon from '../../global/media/header-search-icon.svg';
import { setToLocalStorage } from '../../global/helpers/localStorageHelper';
import styles from './Header.module.scss';
import { CART_ROUTE, HOME_ROUTE } from '../../global/constants';
import { ReactComponent as CartIcon } from '../../global/media/cart.svg';
import { ReactComponent as CatalogIcon } from '../../global/media/catalog.svg';
import Badge from '../Badge';
import CatalogModal from '../CatalogModal';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const products = useSelector(cartSelectors.cartPageProducts);
  const productsInCartCount = products.length;
  const accessToken = useSelector(selectors.accessToken);
  let timer: NodeJS.Timeout;

  const [startAnimation, setStartAnimation] = useState<boolean>();
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [accessToken]);

  useEffect(() => {
    setStartAnimation(true);
    timer = setTimeout(() => {
      setStartAnimation(false);
    }, 500);
    return () => clearInterval(timer);
  }, [productsInCartCount]);

  const handleLogout = () => {
    dispatch(actions.logout());
    setToLocalStorage('accessToken', null);
    setToLocalStorage('refreshToken', null);
  };

  const handleSearch = () => {
    console.log('search');
  };

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
          <img
            src={logo}
            alt="header logo"
            className={styles.logo}
            onClick={handleHomeClick}
          />
        </div>
        <div className={styles.centralBlock}>
          <div className={styles.buttonCatalog} onClick={handleCatalogClick}>
            <CatalogIcon />
            <div className={styles.buttonCatalogText}>
              {t('Header.CATALOG')}
            </div>
          </div>
          <div className={styles.searchBar}>{/*<SearchBar />*/}</div>
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
        {/*{isAuthorized && (*/}
        {/*  <Styled.HeaderControls>*/}
        {/*    <Styled.HeaderSearchButtonContainer onClick={handleSearch}>*/}
        {/*      <img src={searchIcon} alt="search icon" />*/}
        {/*    </Styled.HeaderSearchButtonContainer>*/}
        {/*    <Styled.HeaderLogoutButtonContainer onClick={handleLogout}>*/}
        {/*      {t('Header.LOGOUT_BTN_TEXT')}*/}
        {/*    </Styled.HeaderLogoutButtonContainer>*/}
        {/*  </Styled.HeaderControls>*/}
        {/*)}*/}
      </div>
      {isCatalogModalOpen && (
        <CatalogModal onModalClose={() => setIsCatalogModalOpen(false)} />
      )}
    </div>
  );
};

export default Header;
