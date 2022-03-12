import styled from 'styled-components';
import { baseTheme } from '../../global/styles/theme';

export const ContainedButtonContainer = styled('div')`
  .children-content {
    svg {
      path {
        fill: ${baseTheme.colors.white};
      }
    }
  }
  .children-content:not(:last-child) {
    margin-right: 8px;
  }
`;

export const ContainedLink = styled('div')`
  background: ${baseTheme.colors.mainLightBlue};
  border-radius: 8px;
  border: 2px solid ${baseTheme.colors.mainLightBlue};
  padding: 10px 24px;
  color: ${baseTheme.colors.white};
  font-weight: 500;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background: ${baseTheme.colors.mainBlue};
  }

  .disabled {
    pointer-events: none;
    background: ${baseTheme.colors.disabled};
    border: 2px solid ${baseTheme.colors.disabled};
  }
`;

export const OutlinedButtonContainer = styled('div')`
  :hover {
    background: ${baseTheme.colors.mainBlue};
    color: ${baseTheme.colors.white};
    border-color: ${baseTheme.colors.mainBlue};
    .children-content {
      svg {
        path {
          fill: ${baseTheme.colors.white};
        }
      }
    }
  }
  .children-content {
    svg {
      path {
        fill: ${baseTheme.colors.mainLightBlue};
      }
    }
  }
  .children-content:not(:last-child) {
    margin-right: 8px;
  }

  .disabled {
    background: ${baseTheme.colors.white};
    color: ${baseTheme.colors.disabled};
  }
`;

export const OutlinedLink = styled('div')`
  background: ${baseTheme.colors.white};
  border-radius: 8px;
  padding: 10px 24px;
  color: ${baseTheme.colors.mainLightBlue};
  font-weight: 500;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid ${baseTheme.colors.mainLightBlue};

  .disabled {
    pointer-events: none;
    background: ${baseTheme.colors.disabled};
    border: 2px solid ${baseTheme.colors.disabled};
  }
`;
