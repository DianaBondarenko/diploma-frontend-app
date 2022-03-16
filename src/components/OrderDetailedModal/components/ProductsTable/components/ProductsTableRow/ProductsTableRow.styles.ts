import styled from 'styled-components';
import { baseTheme } from '../../../../../../global/styles/theme';

export const ProductsTableRow = styled('tr')`
  .table-cell {
    font-size: 16px;
    padding-top: 16px;
    font-weight: 400;
    color: ${baseTheme.colors.primary};
    vertical-align: top;
    width: 20%;

    &.item-number {
      width: 5%;
    }

    &.table-cell__info {
      width: 35%;

      .name {
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 10px;
      }

      .packing {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 4px;
      }

      .manufacturer {
        color: ${baseTheme.colors.secondary};
      }

      .needs-recipe {
        margin-top: 16px;
        font-size: 14px;
        font-weight: 500;
        color: ${baseTheme.colors.warning};
      }
    }
  }
`;
