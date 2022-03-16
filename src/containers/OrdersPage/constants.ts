import { DeliveryType, OrderStatus, PaymentType } from './types';

export const GET_ORDERS = 'GET_ORDERS';
export const GET_ORDERS_REFRESH = 'GET_ORDERS_REFRESH';
export const CANCEL_ORDER = 'CANCEL_ORDER';
export const PUT_COLLECTING_STATUS = 'PUT_COLLECTING_STATUS';
export const PUT_READY_STATUS = 'PUT_READY_STATUS';
export const PUT_COMPLETED_STATUS = 'PUT_COMPLETED_STATUS';

export const orderDeliveryTypesStrategy = {
  self: DeliveryType.SELF,
  delivery_yandex: DeliveryType.DELIVERY,
};

export const orderPaymentTypesStrategy = {
  kaspi: PaymentType.KASPI_PAY,
  in_place: PaymentType.IN_PLACE,
};

export const orderStatusesStrategy = {
  new: OrderStatus.UNCONFIRMED,
  waiting_for_receipt: OrderStatus.UNCONFIRMED,
  generate_invoice: OrderStatus.UNCONFIRMED,
  waiting_for_payment: OrderStatus.UNCONFIRMED,
  request_to_place: OrderStatus.UNCONFIRMED,
  in_pharmacy_placed: OrderStatus.UNCONFIRMED,
  in_pharmacy_collecting: OrderStatus.COLLECTING,
  in_pharmacy_ready: OrderStatus.READY,
  waiting_for_delivery: OrderStatus.READY,
  in_delivery: OrderStatus.READY,
  self_delivery: OrderStatus.READY,
  in_pharmacy_complete: OrderStatus.COMPLETED,
  canceled: OrderStatus.CANCELED,
};
