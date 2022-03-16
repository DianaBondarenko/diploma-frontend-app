import styled from 'styled-components';
import { baseTheme } from '../../../../../../global/styles/theme';

export const OrdersTableRow = styled('tr')`
  .table-cell {
    padding: 16px 0;
    border-bottom: 1px solid ${baseTheme.colors.stroking};
    font-size: 16px;
    font-weight: 400;
    color: ${baseTheme.colors.primary};
    cursor: pointer;

    .order-timer {
      font-size: 24px;
      font-weight: 700;
    }

    .timer-green {
      color: ${baseTheme.colors.focus};
    }

    .timer-orange {
      color: ${baseTheme.colors.warning};
    }

    .timer-red {
      color: ${baseTheme.colors.error};
    }

    .timer-grey {
      color: ${baseTheme.colors.disabled};
    }
  }

  .table-cell__order-number {
    font-size: 18px;
    font-weight: 500;
    color: ${baseTheme.colors.primary};
  }
`;
