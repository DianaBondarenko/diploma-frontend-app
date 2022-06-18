import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DeliveryType } from '../../global/types';
import { Status } from './types';
import { FormValues } from '../../components/OrderForm/OrderForm';
import { getProductsCount } from '../../global/helpers';
import { selectors } from './reducer';
import { OrderService } from './service';
import * as actions from './actions';
import * as cartActions from '../CartPage/actions';
import styles from './OrderPage.module.scss';
import ProductCard from '../../components/ProductCard';
import { ProductCardVariant } from '../../components/ProductCard/ProductCard';
import OrderForm from '../../components/OrderForm';
import Summary from '../../components/OrderForm/components/SummaryBlock';
import OrderBreadCrumbs from '../../components/Breadcrumbs/OrderBreadCrumbs';
import ConfirmationModal from '../../components/ConfirmationModal';

const OrderPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orderData = useSelector(selectors.orderPageOrderData);
  const shopId = orderData?.shopId;
  const products = orderData?.products;

  const [orderStatus, setOrderStatus] = useState<Status | null>(null);

  const deliveryCost = 30;

  const productsTotal =
    products?.reduce(
      (sum, { price, count, countDesired }) =>
        (sum += (count >= countDesired ? countDesired : count) * price),
      0
    ) || 0;

  const handleOrderCreation = async (values: FormValues) => {
    try {
      const response = await OrderService.createOrder({
        ...orderData,
        ...values,
      });
      if (response.status === Status.SUCCESS) {
        dispatch(cartActions.clearCart());
        dispatch(actions.clearOrderData());
        setOrderStatus(Status.SUCCESS);
      } else {
        setOrderStatus(Status.ERROR);
      }
    } catch (error) {
      setOrderStatus(Status.ERROR);
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

  const handleModalClose = () => {
    setOrderStatus(null);
  };

  const showModal = orderStatus !== null;

  return (
    <>
      <div className={styles.breadCrumbs}>
        <OrderBreadCrumbs />
      </div>
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
      {showModal && (
        <ConfirmationModal
          type={orderStatus}
          isOpen={showModal}
          onModalClose={handleModalClose}
          orderNumber={null}
        />
      )}
    </>
  );
};

export default OrderPage;
