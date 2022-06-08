import { Component } from 'react';
import axios from 'axios';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../../helpers/localStorageHelper';
import { LoginService } from '../../../containers/LoginPage/service';

const withAuth = (WrappedComponent: any) => {
  class ComposedComponent extends Component {
    requestInterceptor = axios.interceptors.request.use((req: any) => {
      if (getFromLocalStorage('accessToken')) {
        req.headers.Authorization = `Bearer ${getFromLocalStorage(
          'accessToken'
        )}`;
      }
      return req;
    });

    responseInterceptor = axios.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const { status } = err.response;
        if (
          (status === 401 || status === 403) &&
          getFromLocalStorage('refreshToken')
        ) {
          const response = await LoginService.refreshTokens(
            getFromLocalStorage('refreshToken')
          );
          if (response.status === 'success') {
            setToLocalStorage('accessToken', response.result.access_token);
            setToLocalStorage('refreshToken', response.result.refresh_token);
            window.location.reload();
          } else {
            setToLocalStorage('accessToken', null);
            setToLocalStorage('refreshToken', null);
            window.location.reload();
          }
        }

        if (status === 500) {
          return Promise.reject(err);
        }
        return Promise.reject(err);
      }
    );

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return ComposedComponent;
};

export default withAuth;
