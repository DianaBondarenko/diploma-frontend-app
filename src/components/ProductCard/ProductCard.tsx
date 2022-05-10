import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import { PARTLY_AVAILABLE_TEXT } from './constants';
import { PRODUCTS_ROUTE } from '../../../src/global/constants';
import defaultProductImage from '../../../src/global/media/default-product-image.png';
import { ReactComponent as CartIcon } from '../../global/media/cart.svg';
// import {
//   addToCart,
//   changeCountInCart,
//   checkIsAddedToCart,
//   deleteFromCart,
//   getCurrentCart,
//   getProductsCountInCart,
// } from '@global/helpers/localStorageHelper';
import Counter from '../Counter';
// import useAuth from '@global/hooks/useAuth';
import styles from './ProductCard.module.scss';

export interface ProductCardProps {
  id: string | number;
  name: string;
  img?: string;
  description?: string;
  price: number;
  packing?: string;
  weight?: string;
  count?: number;
  countDesired?: number;
  variant: 'search' | 'cart' | 'modal' | 'order';
  manufacturer?: string;
  servicePrice?: number;
  approximatePrice?: number;
  fromCart?: boolean;
  onSaveList?: (save: boolean) => void;
}

/**
 * General component for display product data
 */
const ProductCard = ({
  id,
  name,
  img,
  price,
  packing,
  weight,
  variant,
  manufacturer,
  countDesired: pharmacyCountDesired,
  servicePrice,
  count = 0,
  fromCart,
}: ProductCardProps) => {
  const { t } = useTranslation();

  const isModal = variant === 'modal' || variant == 'order';
  const isCart = variant === 'cart';
  const isSearch = variant === 'search';
  const isOrder = variant === 'order';

  const [isAddedToCart, setIsAddedToCart] = useState<boolean>();
  // const { productsCountInCart } = useCartAppState();
  const [countDesired, setCountDesired] = useState<number>(0);
  // const defaultProductImage = '../../global/media/default-product-image.png';
  const [imgSrc, setImgSrc] = useState<string>(img || defaultProductImage);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  // useEffect(() => {
  //   const currentCart = getCurrentCart();
  //   setIsAddedToCart(checkIsAddedToCart(sku));
  //   if (pharmacyCountDesired) {
  //     setCountDesired(pharmacyCountDesired);
  //   } else {
  //     setCountDesired(currentCart[sku]?.countDesired || 0);
  //   }
  // }, []);
  //
  // useEffect(() => {
  //   setIsAddedToCart(checkIsAddedToCart(sku));
  // }, [productsCountInCart]);

  const setProductsCountInCart = (updatedCart: any) => {
    // dispatch({ type: 'setProductsCountInCart', count: getProductsCountInCart(updatedCart) });
  };

  const increaseCountInCart = () => {
    // const updatedCount = changeCountInCart('plus', sku);
    // setCountDesired(updatedCount);
  };
  const decreaseCountInCart = () => {
    // const updatedCount = changeCountInCart('minus', sku);
    // setCountDesired(updatedCount);
  };

  const productInfo = {
    id,
    name,
    img: imgSrc,
    price,
    packing,
    manufacturer,
    countDesired: 1,
  };

  const handleCartClick = () => {
    // if (checkIsAddedToCart(sku)) {
    //   deleteFromCart(sku);
    // } else {
    //   addToCart(sku, productInfo);
    // }
    // setProductsCountInCart(getCurrentCart());
  };

  const handleListsClick = () => {
    // if (!isAuthorized) {
    //   dispatch({ type: 'openAuthModal' });
    // }
    // setShowListsModal(true);
    // // @ts-ignore
    // onSaveList(false);
  };

  const buttonCartText = isAddedToCart
    ? t('ProductCard.ACTIVE_BUTTON_TEXT')
    : t('ProductCard.INACTIVE_BUTTON_TEXT');

  const bottomBlockModal = (
    <div className={`${styles.bottomBlock} ${styles.bottomBlockModal}`}>
      {count === 0 ? (
        <div className={styles.unavailable}>
          {t('ProductCard.UNAVAILABLE_TEXT')}
        </div>
      ) : (
        <>
          {!isOrder && (
            <div className={styles.countContainerModal}>
              <div className={styles.countModal}>
                {count} {t('ProductCard.UNIT')}
              </div>
              {countDesired > count && (
                <div className={styles.unavailable}>
                  {PARTLY_AVAILABLE_TEXT(count, countDesired)}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );

  const hasPrice = Boolean(price && price !== 0);

  return !isCart || (isCart && isAddedToCart) ? (
    <div
      className={`${styles.mainContainer} ${
        isModal && styles.mainContainerModal
      } ${isSearch && styles.mainContainerSearch}`}
    >
      <>
        <div className={styles.imageBlock}>
          {!isImgLoaded && (
            <div className={styles.loadingSkeletonContainer}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                classes={{ root: styles.loadingSkeleton }}
              />
            </div>
          )}
          <a
            href={`${
              fromCart
                ? `${PRODUCTS_ROUTE}/${id}?=fromcart`
                : `${PRODUCTS_ROUTE}/${id}`
            }`}
          >
            <img
              src={imgSrc || defaultProductImage}
              className={`${styles.image} ${!isImgLoaded && styles.hidden} ${
                !imgSrc ||
                (imgSrc === defaultProductImage && styles.defaultImage)
              }`}
              onError={() => setImgSrc(defaultProductImage)}
              onLoad={() => setIsImgLoaded(true)}
              alt="product image"
            />
          </a>
        </div>
        <div className={styles.rightBlockNew}>
          <div className={styles.upperBlock}>
            <div className={styles.infoBlock}>
              <div className={styles.productInfo}>
                <a
                  href={`${
                    fromCart
                      ? `${PRODUCTS_ROUTE}/${id}?=fromcart`
                      : `${PRODUCTS_ROUTE}/${id}`
                  }`}
                >
                  <div className={styles.productName}>{name}</div>
                </a>
                {!isModal && weight && (
                  <div className={styles.productDescription}>{weight}</div>
                )}
                {manufacturer && (
                  <div className={styles.manufacturer}>{manufacturer}</div>
                )}
                {isModal && bottomBlockModal}
              </div>
              {isSearch && hasPrice && (
                <div className={styles.price}>
                  від {price.toFixed(2)}{' '}
                  <span className={styles.currency}>
                    {t('ProductCard.CURRENCY')}
                  </span>
                </div>
              )}
              {isCart && (
                <Counter
                  value={countDesired}
                  increaseCount={increaseCountInCart}
                  decreaseCount={decreaseCountInCart}
                />
              )}
            </div>
          </div>
        </div>
        {isCart && (
          <div className={styles.rightBlock}>
            <img
              src="/close-dark.svg"
              className={styles.closeIcon}
              onClick={handleCartClick}
              alt="close icon"
            />
            {hasPrice && (
              <div className={styles.price}>
                від {(countDesired * (price || 0))?.toFixed(2)}{' '}
                <span className={styles.currency}>
                  {t('ProductCard.CURRENCY')}
                </span>
              </div>
            )}
          </div>
        )}
        {isModal && count > 0 && servicePrice && (
          <div className={styles.rightBlock}>
            <div className={styles.price}>
              {(count * servicePrice)?.toFixed(2)}{' '}
              <span className={styles.currency}>
                {t('ProductCard.CURRENCY')}
              </span>
            </div>
            {isOrder && (
              <div className={styles.orderPacking}>
                за {count} {t('ProductCard.UNIT')}
              </div>
            )}
          </div>
        )}
        {isSearch && hasPrice && (
          <div
            className={`${styles.cartButton} ${isAddedToCart && styles.active}`}
            onClick={handleCartClick}
          >
            <CartIcon />
            <div className={styles.cartButtonText}>{buttonCartText}</div>
          </div>
        )}
        {isSearch && price === 0 && (
          <div className={styles.notAvailable}>
            {t('ProductCard.UNAVAILABLE_TEXT')}
          </div>
        )}
      </>
    </div>
  ) : (
    <></>
  );
};

export default ProductCard;
