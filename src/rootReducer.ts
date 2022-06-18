import { combineReducers } from 'redux';
import { loginReducer } from './containers/LoginPage';
import { productsPageReducer } from './containers/ProductsPage';
import { productPageReducer } from './containers/ProductPage';
import { cartPageReducer } from './containers/CartPage';
import { shopsPageReducer } from './containers/ShopsPage';
import { orderPageReducer } from './containers/OrderPage';
import { categoriesPageReducer } from './components/CatalogModal';

export default combineReducers({
  loginReducer,
  productsPageReducer,
  productPageReducer,
  cartPageReducer,
  shopsPageReducer,
  categoriesPageReducer,
  orderPageReducer,
});
