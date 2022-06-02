import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectors } from './reducer';
import { getProductsCount } from '../../global/helpers';
import styles from './OrderPage.module.scss';
import ProductCard from '../../components/ProductCard';
import { ProductCardVariant } from '../../components/ProductCard/ProductCard';
import OrderForm from '../../components/OrderForm';
import { DeliveryType } from '../../global/types';
import { OrderService } from './service';
import { Status } from './types';
import * as actions from './actions';
import Summary from '../../components/OrderForm/components/SummaryBlock';

const OrderPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orderData = useSelector(selectors.orderPageOrderData);
  const shopId = orderData?.shopId;
  const products = orderData?.products;

  const deliveryCost = 30;

  const productsTotal =
    products?.reduce(
      (sum, { price, count, countDesired }) =>
        (sum += (count >= countDesired ? countDesired : count) * price),
      0
    ) || 0;

  // const economySize =
  //     products?.reduce(
  //         (sum, { servicePrice, price, count }) => sum + (price - servicePrice) * count,
  //         0,
  //     ) || 0;

  const handleOrderCreation = async () => {
    const response = await OrderService.createOrder(orderData);
    if (response.status !== Status.SUCCESS) {
      console.log('err');
    } else {
      console.log('success order');
    }
  };

  const handleDeliveryTypeChange = (deliveryType: DeliveryType) => {
    dispatch(
      actions.setOrderData({
        ...orderData,
        deliveryType,
      })
    );
  };

  return (
    <>
      <div className={styles.leftBlock}>
        <div className={styles.header}>
          <div className={styles.headerText}>{t('OrderPage.TITLE_TEXT')}</div>
          <div className={styles.subheaderText}>
            {t('OrderPage.SUBTITLE_TEXT')}
          </div>
        </div>
        <div className={styles.formContainer}>
          <OrderForm
            productsList={products || []}
            productsTotal={productsTotal}
            economySize={0}
            shopId={shopId}
            needsRecipe={false}
            onDeliveryTypeChange={handleDeliveryTypeChange}
            handleOrderCreation={handleOrderCreation}
          />
        </div>
      </div>
      <div className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <div className={styles.cartTitle}>{t('OrderPage.TITLE_TEXT')}</div>
          <div className={styles.cartCount}>
            {getProductsCount(products?.length || 0)}
          </div>
        </div>
        <div className={styles.cartCards}>
          {products?.map((item) => (
            <div key={item.id} className={styles.card}>
              <ProductCard {...item} variant={ProductCardVariant.MODAL} />
            </div>
          ))}
        </div>
        <div className={styles.bottomBlock}>
          <Summary
            deliveryType={orderData.deliveryType}
            productsTotal={productsTotal}
            deliveryCost={deliveryCost}
            economySize={0}
            productsCount={orderData.products.length}
          />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
