import { useTranslation } from 'react-i18next';
import styles from './ShopCard.module.scss';
import { ECONOMY_TEXT, UNAVAILABLE_TEXT } from './constants';
// import { PriceHelper } from '../../global/helpers';
// import { PharmacyMappedMedicineItemProps } from '@global/types';
import shopImage from '../../global/media/shop-default-image.svg';

interface PharmacyCardProps {
  id: string;
  name: string;
  description?: string | null;
  address: string;
  // servicePrice: number;
  // price: number;
  // count: number;
  // countDesired: number;
  onCheckout: (products: any, sourceCode: string) => void;
  isSelected: boolean;
  // products?: PharmacyMappedMedicineItemProps[];
}

/**
 * General component for display pharmacy data
 */
const ShopCard = ({
  id,
  name,
  description,
  address,
  // servicePrice,
  // price,
  // count,
  // countDesired,
  onCheckout,
  isSelected,
}: // products,
PharmacyCardProps) => {
  const { t } = useTranslation();

  const countDesired = 2;
  const count = 4;
  const servicePrice = 130;

  return (
    <div
      className={`${styles.pharmacyDesktopContainer} ${
        isSelected && styles.selectedCard
      }`}
    >
      <div className={styles.pharmacyDesktopHeader}>
        <div className={styles.desktopHeaderInfoBlock}>
          <div className={styles.desktopHeaderMainInfoBlock}>
            <img
              className={styles.pharmacyImage}
              src={shopImage}
              alt="pharmacy image"
            />
            <div className={styles.desktopPharmacyName}>{name}</div>
          </div>
          <div className={styles.desktopAdditionalInfoContainer}>
            <div className={styles.desktopPharmacyAddress}>{address}</div>
            {description && (
              <div className={styles.desktopPharmacyDescription}>
                {description}
              </div>
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
          <div className={styles.desktopPriceContainer}>
            {servicePrice.toFixed(2)}
            <span className={styles.desktopPriceCurrency}>
              {t('ShopCard.CURRENCY')}
            </span>
          </div>
          {/* {price - servicePrice > 0 && ( */}
          {/*  <div className={styles.desktopEconomyContainer}> */}
          {/*    {ECONOMY_TEXT(PriceHelper.stripZeros(price - servicePrice))} */}
          {/*    <span className={styles.superscript}>*</span> */}
          {/*  </div> */}
          {/* )} */}
        </div>
      </div>

      <button onClick={() => onCheckout([], id)} className={styles.orderButton}>
        {/* <button onClick={() => onCheckout(products, id)} className={styles.orderButton}> */}
        {t('ShopCard.BUTTON_TEXT')}
      </button>
    </div>
  );
};

export default ShopCard;
