import styled from 'styled-components';
import { baseTheme } from '../../../../global/styles/theme';

export const ProductsTableContainer = styled('table')`
  width: 100%;
  border-collapse: separate;
`;

export const ProductsTableHeaderRow = styled('tr')`
  .table__header-cell {
    font-size: 16px;
    color: ${baseTheme.colors.secondary};
    font-weight: 400;
    text-align: start;
    padding-bottom: 16px;
    border-bottom: 1px solid ${baseTheme.colors.stroking};
    width: 20%;

    &.item-number {
      width: 5%;
    }

    &.product-info {
      width: 35%;
    }
  }
`;
