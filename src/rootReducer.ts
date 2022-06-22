import { combineReducers } from 'redux';
import { productsPageReducer } from './containers/ProductsPage';
import { productPageReducer } from './containers/ProductPage';
import { cartPageReducer } from './containers/CartPage';
import { shopsPageReducer } from './containers/ShopsPage';
import { orderPageReducer } from './containers/OrderPage';
import { categoriesPageReducer } from './components/CatalogModal';

export default combineReducers({
  productsPageReducer,
  productPageReducer,
  cartPageReducer,
  shopsPageReducer,
  categoriesPageReducer,
  orderPageReducer,
});
