import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Styled from './OrdersTable.styles';
import { OrderTableData } from '../../types';
import OrdersTableRow from './components/OrdersTableRow';
import OrderDetailedModal from '../../../../components/OrderDetailedModal';

interface OrdersTableProps {
  data: OrderTableData[];
}

const OrdersTable = ({ data }: OrdersTableProps) => {
  const { t } = useTranslation();

  const [selectedOrder, setSelectedOrder] = useState<null | OrderTableData>(
    null
  );

  const TableHeader = (
    <thead>
      <Styled.OrdersTableHeaderRow>
        <th className="table__header-cell table__header-timer-cell">
          {t('OrdersPage.OrdersTable.headerTitles.TIMER')}
        </th>
        <th className="table__header-cell">
          {t('OrdersPage.OrdersTable.headerTitles.ORDER')}
        </th>
        <th className="table__header-cell">
          {t('OrdersPage.OrdersTable.headerTitles.CREATED_AT')}
        </th>
        <th className="table__header-cell">
          {t('OrdersPage.OrdersTable.headerTitles.PHONE')}
        </th>
        <th className="table__header-cell">
          {t('OrdersPage.OrdersTable.headerTitles.STATUS')}
        </th>
        <th className="table__header-cell table__header-amount-cell">
          {t('OrdersPage.OrdersTable.headerTitles.AMOUNT')}
        </th>
      </Styled.OrdersTableHeaderRow>
    </thead>
  );

  const handleOrderClick = (data: OrderTableData) => {
    setSelectedOrder(data);
  };

  const handleCloseOrderDetailedModal = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <Styled.OrdersTable>
        {TableHeader}
        <tbody>
          {data.map((item) => (
            <OrdersTableRow
              onRowClick={handleOrderClick}
              data={item}
              key={item.orderNumber}
            />
          ))}
        </tbody>
      </Styled.OrdersTable>
      {selectedOrder && (
        <OrderDetailedModal
          onClose={handleCloseOrderDetailedModal}
          data={selectedOrder}
        />
      )}
    </>
  );
};

export default OrdersTable;
