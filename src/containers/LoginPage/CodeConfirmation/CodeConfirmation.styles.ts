import styled from 'styled-components';
import { baseTheme } from '../../../global/styles/theme';

export const CodeConfirmationContainer = styled('div')`
  .send-one-more {
    border: 2px solid ${baseTheme.colors.mainLightBlue};
    border-radius: 7px;
    margin: 10px 0 25px 0;

    button {
      border: none;
      background: transparent;
      font-size: 18px;
      cursor: pointer;
      width: 100%;
    }

    .content {
      text-align: center;
      color: ${baseTheme.colors.mainLightBlue};
      padding: 8px 0;
    }
  }

  .disabled {
    border: 2px solid ${baseTheme.colors.disabled};

    .content {
      color: ${baseTheme.colors.disabled};
    }
  }
`;

export const CodeConfirmationHeader = styled('div')`
  text-align: center;

  .title {
    font-weight: bold;
    font-size: 24px;
  }

  .description {
    width: 345px;
    padding: 8px 0 20px 0;
    color: ${baseTheme.colors.secondary};
  }
`;

export const CodeConfirmation = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .code-title {
    text-align: center;
    padding-bottom: 8px;
    color: ${baseTheme.colors.primary};
  }

  .input {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;

    [type='tel'] {
      font-family: 'Helvetica Neue', Helvetica, sans-serif;
    }
  }
  .input > div > input {
    border: 1px solid ${baseTheme.colors.stroking};
    font-size: 16px;
    font-family: Helvetica Neue sans-serif;
    text-align: center;
    border-radius: 4px;
    margin: 4px;
  }

  .input > div > input:focus {
    border: 1px solid ${baseTheme.colors.stroking};
  }

  .input > div > input:focus + input {
    border-left: 1px solid ${baseTheme.colors.stroking};
  }

  .input > div > input:last-child {
    border: 1px solid ${baseTheme.colors.stroking};
  }

  .input > div > input:first-child {
    border: 1px solid ${baseTheme.colors.stroking};
  }

  .input > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .input-error > div > input {
    border: 1px solid ${baseTheme.colors.error};

    &:focus + input {
      border-left: 1px solid ${baseTheme.colors.error};
    }

    &:focus {
      border: 1px solid ${baseTheme.colors.error};
    }

    &:first-child {
      border: 1px solid ${baseTheme.colors.error};
    }

    &:last-child {
      border: 1px solid ${baseTheme.colors.error};
    }
  }
`;

export const CodeError = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${baseTheme.colors.error};
`;
