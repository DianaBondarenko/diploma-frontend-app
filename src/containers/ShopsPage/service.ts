import axios from 'axios';
import { ProductInCartData } from '../CartPage/types';

export class ShopsService {
  static API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/`;

  static getShopsProposals = async (desiredProducts: ProductInCartData[]) => {
    const body = desiredProducts.map(({ countDesired, id }) => ({
      count: countDesired,
      product_id: id,
    }));

    const response = await axios({
      method: 'post',
      url: `${ShopsService.API_BASE_URL}shops/proposals`,
      data: body,
    });
    return response.data;
  };
}
