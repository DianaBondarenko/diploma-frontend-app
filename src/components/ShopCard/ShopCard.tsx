import { useTranslation } from 'react-i18next';
import styles from './ShopCard.module.scss';
import { ECONOMY_TEXT, UNAVAILABLE_TEXT } from './constants';
// import { PriceHelper } from '../../global/helpers';
import shopImage from '../../global/media/shop-default-image.svg';
import Button from '../Button';

interface ShopCardProps {
  id: string;
  name: string;
  description?: string | null;
  address: string;
  price: number;
  count: number;
  countDesired: number;
  onShopChoice: () => void;
  isSelected: boolean;
}

/**
 * General component for display pharmacy data
 */
const ShopCard = (props: ShopCardProps) => {
  const {
    id,
    name,
    description,
    address,
    price,
    count,
    countDesired,
    onShopChoice,
    isSelected,
  } = props;
  const { t } = useTranslation();

  return (
    <div
      className={`${styles.shopContainer} ${isSelected && styles.selectedCard}`}
    >
      <div className={styles.shopHeader}>
        <div className={styles.headerInfoBlock}>
          <div className={styles.headerMainInfoBlock}>
            <img
              className={styles.shopImage}
              src={shopImage}
              alt="pharmacy image"
            />
            <div className={styles.shopName}>{name}</div>
          </div>
          <div className={styles.additionalInfoContainer}>
            <div className={styles.shopAddress}>{address}</div>
            {description && (
              <div className={styles.shopDescription}>{description}</div>
            )}
            <div className={styles.availabilityBlock}>
              {count >= countDesired ? (
                <div className={styles.available}>
                  {t('ShopCard.AVAILABLE_TEXT')} &gt;
                </div>
              ) : (
                <div className={styles.unavailable}>
                  {UNAVAILABLE_TEXT(countDesired, count)} &gt;
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.priceContainer}>
            {price.toFixed(2)}
            <span className={styles.priceCurrency}>
              {t('ShopCard.CURRENCY')}
            </span>
          </div>
          {/* {price - servicePrice > 0 && ( */}
          {/*  <div className={styles.economyContainer}> */}
          {/*    {ECONOMY_TEXT(PriceHelper.stripZeros(price - servicePrice))} */}
          {/*    <span className={styles.superscript}>*</span> */}
          {/*  </div> */}
          {/* )} */}
        </div>
      </div>
      <div className={styles.orderButton}>
        <Button
          onClick={onShopChoice}
          text={t('ShopCard.BUTTON_TEXT')}
          disabled={!price}
        />
      </div>
    </div>
  );
};

export default ShopCard;
