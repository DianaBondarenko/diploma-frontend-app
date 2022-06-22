import { all } from 'redux-saga/effects';
import { productsPageWatcherSaga } from './containers/ProductsPage/saga';
import { productPageWatcherSaga } from './containers/ProductPage/saga';
import { shopsPageWatcherSaga } from './containers/ShopsPage/saga';
import { categoriesPageWatcherSaga } from './components/CatalogModal/saga';

export default function* rootSaga() {
  yield all([
    productsPageWatcherSaga(),
    productPageWatcherSaga(),
    shopsPageWatcherSaga(),
    categoriesPageWatcherSaga(),
  ]);
}
