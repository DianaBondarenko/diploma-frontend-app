import styled from 'styled-components';
import { baseTheme } from '../../global/styles/theme';

export const OrdersPageContainer = styled('div')`
  max-width: 1216px;
  margin: auto;
`;

export const OrdersPageTitle = styled('div')`
  font-weight: 700;
  font-size: 32px;
  padding-top: 56px;
  color: ${baseTheme.colors.primary};
`;

export const OrdersPageTableContainer = styled('div')`
  padding: 50px 0;
`;
