import { MappedProposalData } from '../ShopsPage/types';
import { DeliveryType, PaymentMethod } from '../../global/types';

export interface OrderData {
  shopId: string;
  phoneNumber: string;
  products: MappedProposalData[];
  paymentMethod: PaymentMethod;
  deliveryType: DeliveryType;
}

export enum Status {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface OrderResponseData {
  created_at: Date;
  _id: string;
  delivery_method: string;
  payment_method: string;
  phone: string;
  products: any[];
  shop_id: string;
}

export interface OrderResponse {
  status: Status;
  data: OrderResponseData;
}

export interface OrderPageState {
  orderPage: {
    order: OrderData;
  };
}
