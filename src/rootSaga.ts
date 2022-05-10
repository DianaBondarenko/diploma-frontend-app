import { all } from 'redux-saga/effects';
import { loginPageWatcherSaga } from './containers/LoginPage/saga';
import { productsPageWatcherSaga } from './containers/ProductsPage/saga';

export default function* rootSaga() {
  yield all([loginPageWatcherSaga(), productsPageWatcherSaga()]);
}
