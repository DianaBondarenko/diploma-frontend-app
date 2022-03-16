import { useTranslation } from 'react-i18next';
import * as Styled from './OrderStatusBlock.styles';
import { OrderStatus } from '../../containers/OrdersPage/types';

interface OrderStatusBlockProps {
  status: OrderStatus;
}

const OrderStatusBlock = ({ status }: OrderStatusBlockProps) => {
  const { t } = useTranslation();

  const titlesStrategy = {
    [OrderStatus.COMPLETED]: t('OrdersPage.OrdersTable.statusTitles.COMPLETED'),
    [OrderStatus.COLLECTING]: t(
      'OrdersPage.OrdersTable.statusTitles.COLLECTING'
    ),
    [OrderStatus.UNCONFIRMED]: t(
      'OrdersPage.OrdersTable.statusTitles.UNCONFIRMED'
    ),
    [OrderStatus.CANCELED]: t('OrdersPage.OrdersTable.statusTitles.CANCELED'),
    [OrderStatus.READY]: t('OrdersPage.OrdersTable.statusTitles.READY'),
  };
  const colorsClassesStrategy = {
    [OrderStatus.COMPLETED]: 'completed',
    [OrderStatus.COLLECTING]: 'collecting',
    [OrderStatus.UNCONFIRMED]: 'unconfirmed',
    [OrderStatus.CANCELED]: 'canceled',
    [OrderStatus.READY]: 'ready',
  };

  return (
    <Styled.OrderStatusBlock className={colorsClassesStrategy[status]}>
      {titlesStrategy[status]}
    </Styled.OrderStatusBlock>
  );
};

export default OrderStatusBlock;
