import axios from 'axios';
import { OrderData } from './types';
import { DeliveryType, PaymentMethod } from '../../global/types';

export class OrderService {
  static API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/`;

  static createOrder = async (payload: OrderData) => {
    const { shopId, phoneNumber, products, paymentMethod, deliveryType } =
      payload;
    const body = {
      shop_id: shopId,
      phone: phoneNumber,
      products: products?.map((product) => ({
        product_id: product.id,
        count: product.countDesired,
      })),
      payment_method:
        paymentMethod === PaymentMethod.ON_DELIVERY ? 'in_place' : '?',
      delivery_method:
        deliveryType === DeliveryType.PICK_UP ? 'in_place' : '?',
    };

    const response = await axios({
      method: 'post',
      url: `${OrderService.API_BASE_URL}orders`,
      data: body,
    });
    return response.data;
  };
}
