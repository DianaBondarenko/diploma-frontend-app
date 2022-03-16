import styled from 'styled-components';
import { baseTheme } from '../../global/styles/theme';

export const OrderDetailedModalContent = styled('div')`
  width: 675px;
`;

export const OrderDetailedHeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const OrderDetailedGeneralInfo = styled('div')`
  display: flex;
  flex-direction: column;

  .order-number {
    font-size: 24px;
    font-weight: 700;
    color: ${baseTheme.colors.primary};
    margin-bottom: 8px;
  }

  .creation-date {
    font-size: 16px;
    font-weight: 400;
    color: ${baseTheme.colors.secondary};
    margin-bottom: 10px;
  }

  .phone-number {
    color: ${baseTheme.colors.primary};
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const OrderDetailedControlsContainer = styled('div')`
  display: flex;

  .left-block {
    width: 118px;
    margin-right: 12px;

    div:first-child {
      margin-bottom: 12px;
    }
  }

  .right-block {
    width: 170px;

    div:first-child {
      margin-bottom: 12px;
    }
  }
`;

export const OrderDetailedDetailsInfo = styled('div')`
  padding: 24px;
  border: 1px solid ${baseTheme.colors.stroking};
  border-radius: 8px;

  .details-info__title {
    font-size: 20px;
    font-weight: 700;
    color: ${baseTheme.colors.primary};
    margin-bottom: 24px;
  }

  .delivery-type {
    display: flex;
    margin-bottom: 12px;

    .delivery-type__title {
      font-size: 16px;
      font-weight: 400;
      color: ${baseTheme.colors.secondary};
      margin-right: 8px;
    }

    .delivery-type__value {
    }
  }

  .payment-type {
    display: flex;

    .payment-type__title {
      font-size: 16px;
      font-weight: 400;
      color: ${baseTheme.colors.secondary};
      margin-right: 8px;
    }

    .payment-type__value {
      font-weight: 700;
      color: ${baseTheme.colors.error};

      &.paid {
        color: ${baseTheme.colors.focus};
      }
    }
  }
`;

export const OrderDetailedProductsContainer = styled('div')`
  padding: 24px;
  border: 1px solid ${baseTheme.colors.stroking};
  border-radius: 8px;
  margin-bottom: 32px;

  .products-container__title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 24px;
  }
`;
