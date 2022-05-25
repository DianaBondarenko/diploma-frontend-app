import axios from 'axios';

export class CategoriesService {
  static API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/`;

  static getAllCategories = async () => {
    const response = await axios({
      method: 'get',
      url: `${CategoriesService.API_BASE_URL}categories`,
    });
    return response.data;
  };
}
