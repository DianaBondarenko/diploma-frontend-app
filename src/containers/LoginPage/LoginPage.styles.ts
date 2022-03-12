import styled from 'styled-components';
import { baseTheme } from '../../global/styles/theme';

export const LoginPageContainer = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
`;

export const LoginPageContent = styled('div')`
  max-width: 365px;
`;

export const LoginPagePhoneConfirmation = styled('div')`
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    color: ${baseTheme.colors.primary};
    margin-bottom: 32px;
  }

  .form-container {
    display: flex;
    flex-direction: column;

    .form-block {
      display: flex;
      flex-direction: column;
    }

    .form-label {
      color: ${baseTheme.colors.secondary};
      margin-bottom: 8px;
    }

    .form-label.error {
      margin: 8px 0 0;
      color: ${baseTheme.colors.error};
      font-size: 14px;
    }

    .input {
      outline: none !important;
      border: 1px solid ${baseTheme.colors.stroking};
      border-radius: 4px;
      color: ${baseTheme.colors.primary} !important;
      padding: 10px 12px;
    }

    .input::placeholder {
      color: ${baseTheme.colors.tertiary};
    }

    .input-error {
      background-color: rgb(${baseTheme.colors.error}, 0.05);
      border: 1px solid ${baseTheme.colors.error};
    }

    .error-message-label {
      margin: 8px 0 0;
      color: ${baseTheme.colors.error};
      font-size: 14px;
    }
  }
`;

export const FormSubmitButton = styled('button')`
  cursor: pointer;
  width: 100%;
  margin-top: 16px;
  padding: 12px 24px;
  background-color: ${baseTheme.colors.mainLightBlue};
  color: ${baseTheme.colors.white};
  border-radius: 8px;
  font-size: 18px;
  border: none;
`;

export const LoginAgreementContainer = styled('div')`
  margin-top: 32px;

  .checkbox-container {
    display: flex;

    .checkbox {
      margin-top: -12px;
      svg {
        margin: -30px 0 0 -10px;
        width: 20px;
        height: 20px;
        path {
          fill: ${baseTheme.colors.stroking};
        }
      }
    }

    .accept {
      font-size: 16px;
      width: 100%;

      a {
        color: ${baseTheme.colors.mainLightBlue};
        cursor: pointer;
      }
    }
  }

  .checkbox-error-message {
    color: ${baseTheme.colors.error};
    margin-top: 8px;
    font-size: 14px;
  }
`;
