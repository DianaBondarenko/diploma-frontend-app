import axios from 'axios';
import { OrderPayload } from './types';
import { DeliveryType, PaymentMethod } from '../../global/types';

export class OrderService {
  static API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/`;

  static createOrder = async (payload: OrderPayload) => {
    const {
      shopId,
      phone,
      products,
      paymentMethod,
      deliveryType,
      address,
      apartmentsNumber,
      floorNumber,
      enterNumber,
      comment,
    } = payload;
    let body = {
      shop_id: shopId,
      phone,
      products: products?.map((product) => ({
        product_id: product.id,
        count: product.countDesired,
      })),
      payment_method:
        paymentMethod === PaymentMethod.ON_DELIVERY
          ? 'on_delivery'
          : 'on_delivery',
      delivery_method:
        deliveryType === DeliveryType.PICK_UP ? 'in_place' : 'delivery',
    };
    if (deliveryType === DeliveryType.DELIVERY) {
      body = {
        ...body,
        // @ts-ignore
        address,
        apartmentsNumber,
        floorNumber,
        enterNumber,
        comment,
      };
    }

    const response = await axios({
      method: 'post',
      url: `${OrderService.API_BASE_URL}orders`,
      data: body,
    });
    return response.data;
  };
}
