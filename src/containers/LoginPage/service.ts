import axios from 'axios';

export class LoginService {
  static API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/`;

  static auth = async (phoneNumber: string, validationCode: string) => {
    const response = await axios({
      method: 'post',
      url: `${LoginService.API_BASE_URL}users/auth`,
      data: JSON.stringify({
        phone: phoneNumber,
        validation_code: validationCode,
      }),
    });
    return response.data;
  };

  static refreshTokens = async (refreshToken: string) => {
    const response = await axios({
      method: 'post',
      url: `${LoginService.API_BASE_URL}users/auth/refresh`,
      data: {
        refresh_token: refreshToken,
      },
    });
    return response.data;
  };

  static validatePhoneNumber = async (phoneNumber: string) => {
    const response = await axios({
      method: 'post',
      url: `${LoginService.API_BASE_URL}users/sms`,
      data: JSON.stringify({
        phone: phoneNumber,
        sms_type: 'auth',
      }),
    });
    return response.data;
  };
}
