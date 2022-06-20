import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
import { PARTLY_AVAILABLE_TEXT } from './constants';
import * as actions from '../../containers/CartPage/actions';
import { PRODUCTS_ROUTE } from '../../../src/global/constants';
import defaultProductImage from '../../global/media/default-product-image.png';
import { ReactComponent as CartIcon } from '../../global/media/cart.svg';
import closeIcon from '../../global/media/close.svg';
import Counter from '../Counter';
import styles from './ProductCard.module.scss';
import useCheckIsProductInCart from '../../global/hooks/useCheckIsProductInCart';
import useProductInCartCount from '../../global/hooks/useProductInCartCount';
import Button from '../Button';
import { ButtonVariant } from '../Button/Button';

enum UpdateCountAction {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}
export enum ProductCardVariant {
  SEARCH = 'SEARCH',
  CART = 'CART',
  MODAL = 'MODAL',
  ORDER = 'ORDER',
}

export interface ProductCardProps {
  id: string;
  name: string;
  img?: string;
  description?: string;
  price: number;
  packing?: string;
  weight?: string;
  count?: number;
  countDesired?: number;
  variant: ProductCardVariant;
  manufacturer?: string;
  fromCart?: boolean;
}

const ProductCard = ({
  id,
  name,
  img,
  price,
  packing,
  weight,
  variant,
  manufacturer,
  countDesired: productCountDesired,
  count = 0,
  fromCart,
}: ProductCardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAddedToCart = useCheckIsProductInCart(id);
  const countDesired = useProductInCartCount(id);

  const isModal =
    variant === ProductCardVariant.MODAL ||
    variant === ProductCardVariant.ORDER;
  const isCart = variant === ProductCardVariant.CART;
  const isSearch = variant === ProductCardVariant.SEARCH;
  const isOrder = variant === ProductCardVariant.ORDER;

  const [imgSrc, setImgSrc] = useState<string>(img || defaultProductImage);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

  const productInfo = {
    id,
    name,
    image: imgSrc,
    manufacturer,
    price,
    packing,
    weight,
    countDesired: productCountDesired ?? 1,
  };

  const handleCartClick = () => {
    if (isAddedToCart) {
      dispatch(actions.deleteProduct(id));
    } else {
      dispatch(actions.addProduct(productInfo));
    }
  };

  const updateCountInCart = (action: UpdateCountAction) => {
    const getUpdatedCount = () => {
      if (action === UpdateCountAction.DECREASE) {
        return productInfo.countDesired > 1 ? productInfo.countDesired - 1 : 1;
      }
      return productInfo.countDesired + 1;
    };
    const updatedProductInfo = {
      ...productInfo,
      countDesired: getUpdatedCount(),
    };
    dispatch(actions.updateProduct({ id, productInfo: updatedProductInfo }));
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
              ? `${PRODUCTS_ROUTE}/${id}?fromCart=true`
              : `${PRODUCTS_ROUTE}/${id}`
          }`}
        >
          <img
            src={imgSrc || defaultProductImage}
            className={`${styles.image} ${!isImgLoaded && styles.hidden} ${
              !imgSrc || (imgSrc === defaultProductImage && styles.defaultImage)
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
                increaseCount={() =>
                  updateCountInCart(UpdateCountAction.INCREASE)
                }
                decreaseCount={() =>
                  updateCountInCart(UpdateCountAction.DECREASE)
                }
              />
            )}
          </div>
        </div>
      </div>
      {isCart && (
        <div className={styles.rightBlock}>
          <img
            src={closeIcon}
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
      {isModal && count > 0 && price && (
        <div className={styles.rightBlock}>
          <div className={styles.price}>
            {(count * price)?.toFixed(2)}{' '}
            <span className={styles.currency}>{t('ProductCard.CURRENCY')}</span>
          </div>
          {isOrder && (
            <div className={styles.orderPacking}>
              за {count} {t('ProductCard.UNIT')}
            </div>
          )}
        </div>
      )}
      {isSearch && (
        <Button
          variant={
            isAddedToCart ? ButtonVariant.CONTAINED : ButtonVariant.OUTLINED
          }
          onClick={handleCartClick}
          text={hasPrice ? buttonCartText : t('ProductCard.UNAVAILABLE_TEXT')}
          fullWidth
          disabled={!hasPrice}
        >
          {hasPrice && <CartIcon />}
        </Button>
      )}
    </div>
  ) : (
    <></>
  );
};

export default ProductCard;
