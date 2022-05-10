import axios from 'axios';

export class ProductsService {
  static API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/`;

  static getProductsBySearchValue = async () => {
    const response = await axios({
      method: 'get',
      url: `${ProductsService.API_BASE_URL}products`,
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
