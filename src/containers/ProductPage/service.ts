import axios from 'axios';

export class ProductsService {
  static API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/`;

  static getProductsBySearchValue = async (searchValue: string) => {
    const response = await axios({
      method: 'get',
      url: `${ProductsService.API_BASE_URL}products?searchValue=${searchValue}`,
    });
    return response.data;
  };
  static getProductById = async (id: string) => {
    const response = await axios({
      method: 'get',
      url: `${ProductsService.API_BASE_URL}products/${id}`,
    });
    return response.data;
  };
}
