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

  static getProductsBySkus = async (skus: string[]) => {
    const response = await axios({
      method: 'get',
      url: `${
        process.env.REACT_APP_SEARCH_URL
      }/rest/default/V1/products?searchCriteria[filter_groups][0][filters][0][field]=sku&searchCriteria[filter_groups][0][filters][0][value]=${skus.join()}&searchCriteria[filter_groups][0][filters][0][condition_type]=in`,
    });
    return response.data;
  };
}
