import styled from 'styled-components';
import { baseTheme } from '../../../../global/styles/theme';

export const ControlButtonContainer = styled('div')`
  font-weight: 500;
  font-size: 18px;
  padding: 8px 0;
  color: ${baseTheme.colors.white};
  border-radius: 8px;
  width: 100%;
  background-color: ${baseTheme.colors.disabled};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.active {
    background-color: ${baseTheme.colors.mainLightBlue};
  }
`;
