import styled from 'styled-components';
import { baseTheme } from '../../global/styles/theme';

export const ModalWindowContainer = styled('div')`
  background-color: ${baseTheme.colors.white};
  overflow: hidden;
  position: fixed;
  width: max-content;
  z-index: 300;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgb(144 154 170 / 30%);
`;

export const ModalWindowContent = styled('div')`
  padding: 0 64px 56px 64px;
  max-height: 60vh;
  overflow: auto;
`;

export const ModalWindowHeader = styled('div')`
  padding: 16px;
  display: flex;
  justify-content: flex-end;

  img {
    cursor: pointer;
  }
`;

export const ModalWindowBackdrop = styled('div')`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 290;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background-color: ${baseTheme.colors.primary};
  opacity: 0.3;
`;

export const ModalCloseIconContainer = styled('div')``;
