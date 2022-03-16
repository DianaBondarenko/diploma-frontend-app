import { useTranslation } from 'react-i18next';
import * as Styled from './OrderDetailedModal.styles';
import ModalWindow from '../ModalWindow';
import {
  DeliveryType,
  OrderStatus,
  OrderTableData,
  PaymentType,
} from '../../containers/OrdersPage/types';
import OrderStatusBlock from '../OrderStatusBlock';
import ControlButton from './components/ControlButton';
import ProductsTable from './components/ProductsTable';

interface OrderDetailedModalProps {
  data: OrderTableData;
  onClose: () => void;
}

const OrderDetailedModal = ({ data, onClose }: OrderDetailedModalProps) => {
  const { t } = useTranslation();

  const deliveryTypeTitlesStrategy = {
    [DeliveryType.DELIVERY]: t('OrdersPage.OrderDetailedModal.DELIVERY_TITLE'),
    [DeliveryType.SELF]: t('OrdersPage.OrderDetailedModal.SELF_DELIVERY_TITLE'),
  };

  const paymentTypeTitlesStrategy = {
    [PaymentType.IN_PLACE]: t(
      'OrdersPage.OrderDetailedModal.IN_PLACE_PAY_TITLE'
    ),
    [PaymentType.KASPI_PAY]: t('OrdersPage.OrderDetailedModal.KASPI_PAY_TITLE'),
  };

  return (
    <ModalWindow onClose={onClose}>
      <Styled.OrderDetailedModalContent>
        <Styled.OrderDetailedHeaderContainer>
          <Styled.OrderDetailedGeneralInfo>
            <div className="order-number">{`Заказ ${data.orderNumber}`}</div>
            <div className="creation-date">{`От ${data.createdAt}`}</div>
            <div className="phone-number">{data.phone}</div>
            <OrderStatusBlock status={data.status} />
          </Styled.OrderDetailedGeneralInfo>
          <Styled.OrderDetailedControlsContainer>
            <div className="left-block">
              <ControlButton
                active={data.status === OrderStatus.COLLECTING}
                onClick={() => {}}
                title={t('OrdersPage.OrderDetailedModal.controls.COLLECTING')}
              />
              <ControlButton
                active={data.status !== OrderStatus.COMPLETED}
                onClick={() => {}}
                title={t('OrdersPage.OrderDetailedModal.controls.CANCEL')}
              />
            </div>
            <div className="right-block">
              <ControlButton
                active={data.status === OrderStatus.READY}
                onClick={() => {}}
                title={t('OrdersPage.OrderDetailedModal.controls.READY')}
              />
              <ControlButton
                active={data.status === OrderStatus.COMPLETED}
                onClick={() => {}}
                title={t('OrdersPage.OrderDetailedModal.controls.COMPLETED')}
              />
            </div>
          </Styled.OrderDetailedControlsContainer>
        </Styled.OrderDetailedHeaderContainer>

        <Styled.OrderDetailedProductsContainer>
          <div className="products-container__title">
            {t('OrdersPage.OrderDetailedModal.PRODUCTS_TABLE_TITLE')}
          </div>
          <ProductsTable products={data.products} />
        </Styled.OrderDetailedProductsContainer>

        <Styled.OrderDetailedDetailsInfo>
          <div className="details-info__title">
            {t('OrdersPage.OrderDetailedModal.DETAILS_TITLE')}
          </div>
          <div className="delivery-type">
            <div className="delivery-type__title">
              {t('OrdersPage.OrderDetailedModal.DELIVERY_TYPE_TITLE')}
            </div>
            <div className="delivery-type__value">
              {deliveryTypeTitlesStrategy[data.deliveryType]}
            </div>
          </div>
          <div className="payment-type">
            <div className="payment-type__title">
              {t('OrdersPage.OrderDetailedModal.PAYMENT_TYPE_TITLE')}
            </div>
            <div
              className={`payment-type__value ${
                data.paymentType === PaymentType.KASPI_PAY && 'paid'
              }`}
            >
              {paymentTypeTitlesStrategy[data.paymentType]}
            </div>
          </div>
        </Styled.OrderDetailedDetailsInfo>
      </Styled.OrderDetailedModalContent>
    </ModalWindow>
  );
};

export default OrderDetailedModal;
