import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@mui/material';
import { MappedProductData } from '../../containers/ProductPage/types';
import { ReactComponent as CartIcon } from '../../global/media/cart.svg';
import defaultProductImage from '../../global/media/default-product-image.png';
import styles from './GeneralProductCard.module.scss';
import Button from '../Button';

interface GeneralProductInfoProps extends MappedProductData {
  handleButtonClick: () => void;
  buttonText: string;
}

const GeneralProductCard = ({
  name,
  price,
  image,
  packing,
  handleButtonClick,
  buttonText,
}: GeneralProductInfoProps) => {
  const { t } = useTranslation();

  const [imgSrc, setImgSrc] = useState<string>(image || defaultProductImage);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const hasPrice = price !== 0;

  return (
    <div className={styles.mainContainer}>
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
        <img
          className={`${styles.image} ${!isImgLoaded && styles.hidden}`}
          src={imgSrc ? imgSrc : defaultProductImage}
          alt="product image"
          onError={() => {
            setImgSrc(defaultProductImage);
            setIsImgLoaded(true);
          }}
          onLoad={() => setIsImgLoaded(true)}
        />
      </div>
      <div className={styles.contentBlock}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{packing}</div>
        {hasPrice && (
          <>
            <div className={styles.price}>
              от {price.toFixed(2)}{' '}
              <span className={styles.currency}>
                {t('GeneralProductCard.CURRENCY')}
              </span>
            </div>
            <div className={styles.buttonCart}>
              <Button onClick={handleButtonClick} text={buttonText}>
                <CartIcon />
              </Button>
            </div>
          </>
        )}
        {!hasPrice && (
          <div className={styles.notAvailableProductDesktop}>
            {t('GeneralProductCard.NOT_AVAILABLE')}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralProductCard;
