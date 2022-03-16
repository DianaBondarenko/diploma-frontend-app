import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Styled from './OrderDetailedModal.styles';
import * as actions from '../../containers/OrdersPage/actions';
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
  onOrderCancel: (id: string) => void;
}

const OrderDetailedModal = ({
  data,
  onClose,
  onOrderCancel,
}: OrderDetailedModalProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

  const handleCollectingStatusClick = () => {
    onClose();
    dispatch(actions.putCollectingStatus.request({ id: data.id }));
  };

  const handleCancelOrderClick = () => {
    onClose();
    onOrderCancel(data.id);
  };

  const handleReadyStatusClick = () => {
    onClose();
    dispatch(actions.putReadyStatus.request({ id: data.id }));
  };

  const handleCompletedStatusClick = () => {
    onClose();
    dispatch(actions.putCompletedStatus.request({ id: data.id }));
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
                onClick={handleCollectingStatusClick}
                title={t('OrdersPage.OrderDetailedModal.controls.COLLECTING')}
                disabled={data.status === OrderStatus.COLLECTING}
              />
              <ControlButton
                active={data.status !== OrderStatus.COMPLETED}
                onClick={handleCancelOrderClick}
                title={t('OrdersPage.OrderDetailedModal.controls.CANCEL')}
                disabled={data.status === OrderStatus.COMPLETED}
              />
            </div>
            <div className="right-block">
              <ControlButton
                active={data.status === OrderStatus.READY}
                onClick={handleReadyStatusClick}
                title={t('OrdersPage.OrderDetailedModal.controls.READY')}
                disabled={data.status === OrderStatus.READY}
              />
              <ControlButton
                active={data.status === OrderStatus.COMPLETED}
                onClick={handleCompletedStatusClick}
                title={t('OrdersPage.OrderDetailedModal.controls.COMPLETED')}
                disabled={data.status === OrderStatus.COMPLETED}
              />
            </div>
          </Styled.OrderDetailedControlsContainer>
        </Styled.OrderDetailedHeaderContainer>

        <Styled.OrderDetailedProductsContainer>
          <div className="products-container__title">
            {t('OrdersPage.OrderDetailedModal.PRODUCTS_TABLE_TITLE')}
          </div>
          <ProductsTable products={data.products} />
          <div className="total-amount__container">
            <div className="total-amount__title">
              {t(
                'OrdersPage.OrderDetailedModal.ProductsTable.TOTAL_AMOUNT_TITLE'
              )}
            </div>
            <div className="total-amount__value">{data.amount}</div>
          </div>
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
