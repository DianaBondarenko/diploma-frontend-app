import axios from 'axios';

export class OrdersService {
  static API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/`;

  static getOrders = async () => {
    const response = await axios({
      method: 'get',
      url: `${OrdersService.API_BASE_URL}users/orders`,
    });
    return response.data;
  };
}
