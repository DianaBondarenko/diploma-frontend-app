import { useTranslation } from 'react-i18next';
import styles from './Summary.module.scss';
import { getProductsCount } from '../../../../global/helpers';
import { DeliveryType } from '../../../../global/types';

export interface SummaryProps {
  deliveryType: DeliveryType;
  productsTotal: number;
  productsCount: number;
  deliveryCost: number;
  economySize?: number;
}

const Summary = ({
  deliveryType,
  productsTotal,
  economySize,
  deliveryCost,
  productsCount,
}: SummaryProps) => {
  const { t } = useTranslation();

  const total =
    deliveryType === DeliveryType.DELIVERY
      ? productsTotal + deliveryCost
      : productsTotal;

  const productsCostBlock = (
    <div className={styles.costBlock}>
      {t('OrderForm.PRODUCTS_COST')}{' '}
      <span className={styles.highlighted}>
        {productsTotal} {t('OrderForm.CURRENCY')}
      </span>
    </div>
  );
  const productsCountBlock = (
    <div>
      {t('OrderForm.IN_CART')}{' '}
      <span className={styles.highlighted}>
        {getProductsCount(productsCount)}
      </span>
    </div>
  );
  const deliveryCostBlock = (
    <div>
      {t('OrderForm.DELIVERY_COST')}{' '}
      <span className={styles.highlighted}>
        {deliveryCost} {t('OrderForm.CURRENCY')}
      </span>
    </div>
  );
  const totalPriceBlock = (
    <div className={styles.totalPrice}>
      {t('OrderForm.TOTAL')}{' '}
      <span className={styles.highlighted}>
        {total} {t('OrderForm.CURRENCY')}
      </span>
    </div>
  );

  const economyBlock = (
    <>
      {Boolean(economySize && economySize > 0) && (
        <div className={styles.economyBlock}>
          {t('OrderForm.ECONOMY')} {Number(economySize)}{' '}
          {/* {t('OrderForm.ECONOMY')} {PriceHelper.stripZeros(Number(economySize))}{' '} */}
          {t('OrderForm.CURRENCY')}
          <span className={styles.superscript}>*</span>
        </div>
      )}
    </>
  );

  return (
    <div className={styles.summaryBlock}>
      <div className={styles.summaryLeft}>
        {productsCostBlock}
        {deliveryType === DeliveryType.DELIVERY && deliveryCostBlock}
      </div>
      <div className={styles.summaryRight}>
        {totalPriceBlock}
        {economyBlock}
      </div>
    </div>
  );
};
export default Summary;
