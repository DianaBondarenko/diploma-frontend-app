import styled from 'styled-components';
import { baseTheme } from '../../global/styles/theme';

export const OrderStatusBlock = styled('div')`
  padding: 4px 10px;
  font-weight: 700;
  color: ${baseTheme.colors.white};
  font-size: 16px;
  width: max-content;
  border-radius: 4px;

  &.completed {
    background-color: ${baseTheme.colors.focus};
  }

  &.collecting {
    background-color: ${baseTheme.colors.mainLightBlue};
  }

  &.unconfirmed {
    background-color: ${baseTheme.colors.error};
  }

  &.canceled {
    background-color: ${baseTheme.colors.error};
  }

  &.ready {
    background-color: ${baseTheme.colors.warning};
  }
`;
