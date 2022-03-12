import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as actions from './actions';
import { LoginService } from './service';
import { setToLocalStorage } from '../../global/helpers';

interface LoginSagaParams {
  type: string;
  payload: { phone: string; validationCode: string };
}
interface ValidationCodeSagaParams {
  type: string;
  payload: { phone: string };
}
interface AuthResponse {
  status: string;
  result: {
    access_token: string;
    refresh_token: string;
  };
}

export function* authSaga({ payload }: LoginSagaParams) {
  try {
    const response: AuthResponse = yield call(
      LoginService.auth,
      payload.phone,
      payload.validationCode
    );
    setToLocalStorage('accessToken', response.result.access_token);
    setToLocalStorage('refreshToken', response.result.refresh_token);
    yield put(actions.auth.success(response.result));
  } catch (error) {
    yield put(actions.auth.error(error));
  }
}

export function* getValidationCodeSaga({ payload }: ValidationCodeSagaParams) {
  try {
    yield call(LoginService.validatePhoneNumber, payload.phone);
    yield put(actions.getValidationCode.success());
  } catch (error) {
    yield put(actions.getValidationCode.error(error));
  }
}

export function* loginPageWatcherSaga() {
  yield all([
    takeLatest(actions.auth.REQUEST, authSaga),
    takeLatest(actions.getValidationCode.REQUEST, getValidationCodeSaga),
  ]);
}
