import styled from 'styled-components';
import { baseTheme } from '../../global/styles/theme';

export const FooterContainer = styled('div')`
  border-top: 1px solid ${baseTheme.colors.stroking};
  padding: 0 32px;
`;

export const FooterContentContainer = styled('div')`
  display: grid;
  max-width: 1216px;
  margin: auto;
  grid-template-columns: repeat(12, 1fr);
`;

export const FooterContentBlock = styled('div')`
  margin: 24px 0;
  display: flex;
  justify-content: space-between;
  grid-gap: 10px;
  grid-column: 4/10;
`;

export const FooterLeftBlock = styled('div')`
  .description {
    padding-top: 10px;
    color: ${baseTheme.colors.secondary};
    font-size: 14px;
  }
`;

export const FooterRightBlock = styled('div')`
  padding-right: 10px;
  width: 110px;
`;

export const FooterLinks = styled('div')`
  display: flex;
  padding-bottom: 5px;

  a {
    &:last-child {
      margin-left: 12px;
    }
  }
`;

export const FooterPhone = styled('div')`
  display: flex;
  padding-bottom: 8px;
  color: ${baseTheme.colors.secondary};
  font-size: 14px;
  justify-content: space-between;

  .icon {
    margin-right: -20px;
  }
`;
