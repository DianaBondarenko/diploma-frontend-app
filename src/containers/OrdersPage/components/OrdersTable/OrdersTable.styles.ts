import styled from 'styled-components';
import { baseTheme } from '../../../../global/styles/theme';

export const OrdersTableHeaderRow = styled('tr')`
  .table__header-cell {
    font-size: 16px;
    color: ${baseTheme.colors.secondary};
    font-weight: 400;
    text-align: start;
    padding-bottom: 16px;
    border-bottom: 1px solid ${baseTheme.colors.stroking};
    width: 20%;
  }

  .table__header-timer-cell,
  .table__header-amount-cell {
    width: 10%;
  }
`;

export const OrdersTable = styled('table')`
  width: 100%;
  border-collapse: separate;
`;
