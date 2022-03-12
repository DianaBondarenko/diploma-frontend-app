import { all } from 'redux-saga/effects';
import { loginPageWatcherSaga } from './containers/LoginPage/saga';
import { ordersPageWatcherSaga } from './containers/OrdersPage/saga';

export default function* rootSaga() {
  yield all([loginPageWatcherSaga(), ordersPageWatcherSaga()]);
}
