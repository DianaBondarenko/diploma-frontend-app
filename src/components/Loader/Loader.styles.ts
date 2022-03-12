import styled from 'styled-components';
import { baseTheme } from '../../global/styles/theme';

export const LoaderContainer = styled('div')`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${baseTheme.colors.primary};
  opacity: 0.75;
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
`;
