import styled from 'styled-components';
import { baseTheme } from '../../global/styles/theme';

export const HeaderContainer = styled('div')`
  background-color: ${baseTheme.colors.mainBlue};
  padding: 12px 32px;
`;

export const HeaderContent = styled('div')`
  max-width: 1216px;
  margin: auto;
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderLogoPharmacyNameContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export const PharmacyNameContainer = styled('div')`
  font-size: 16px;
  font-weight: 500;
  color: ${baseTheme.colors.white};
  margin-left: 42px;
`;

export const HeaderLogo = styled('div')`
  cursor: pointer;
`;

export const HeaderControls = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export const HeaderSearchButtonContainer = styled('div')`
  height: 40px;
  width: 40px;
  border-radius: 8px;
  background-color: ${baseTheme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 16px;
`;

export const HeaderLogoutButtonContainer = styled('div')`
  padding: 9px 16px;
  border-radius: 8px;
  background-color: ${baseTheme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: ${baseTheme.colors.mainLightBlue};
  cursor: pointer;
`;
