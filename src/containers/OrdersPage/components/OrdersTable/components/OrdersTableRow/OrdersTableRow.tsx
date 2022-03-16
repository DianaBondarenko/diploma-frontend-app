import * as Styled from './OrdersTableRow.styles';
import { OrderStatus, OrderTableData } from '../../../../types';
import { getOrderTimer } from '../../../../helpers';
import OrderStatusBlock from '../../../../../../components/OrderStatusBlock';

interface OrdersTableRowProps {
  data: OrderTableData;
  onRowClick: (data: OrderTableData) => void;
}

const OrdersTableRow = ({ data, onRowClick }: OrdersTableRowProps) => {
  const getTimer = (diffMs: number, status: OrderStatus) => {
    if (
      data.status !== OrderStatus.COMPLETED &&
      data.status !== OrderStatus.CANCELED
    ) {
      if (diffMs / 3600000 > 48) return null;
      const getTimerColor = () => {
        if (status !== OrderStatus.UNCONFIRMED) return `timer-grey`; // color for processed order
        if (diffMs < 18000000) return 'timer-green'; // color for timer from 00:00 to 05:00
        if (diffMs < 36000000) return 'timer-orange'; // color for timer from 05:00 to 10:00
        if (diffMs < 54000000) return 'timer-red'; // color for timer from 10:00 to 15:00
      };
      return (
        <div className={`order-timer ${getTimerColor()}`}>
          {getOrderTimer(diffMs)}
        </div>
      );
    }
    return null;
  };

  return (
    <Styled.OrdersTableRow onClick={() => onRowClick(data)}>
      <td className="table-cell">{getTimer(data.diffMsTimer, data.status)}</td>
      <td className="table-cell table-cell__order-number">
        {data.orderNumber}
      </td>
      <td className="table-cell">{data.createdAt}</td>
      <td className="table-cell">{data.phone}</td>
      <td className="table-cell">
        <OrderStatusBlock status={data.status} />
      </td>
      <td className="table-cell">{data.amount}</td>
    </Styled.OrdersTableRow>
  );
};

export default OrdersTableRow;
