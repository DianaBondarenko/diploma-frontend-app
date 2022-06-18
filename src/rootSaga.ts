import { all } from 'redux-saga/effects';
import { loginPageWatcherSaga } from './containers/LoginPage/saga';
import { productsPageWatcherSaga } from './containers/ProductsPage/saga';
import { productPageWatcherSaga } from './containers/ProductPage/saga';
import { shopsPageWatcherSaga } from './containers/ShopsPage/saga';
import { categoriesPageWatcherSaga } from './components/CatalogModal/saga';

export default function* rootSaga() {
  yield all([
    loginPageWatcherSaga(),
    productsPageWatcherSaga(),
    productPageWatcherSaga(),
    shopsPageWatcherSaga(),
    categoriesPageWatcherSaga(),
  ]);
}
