import { combineReducers } from 'redux';
import { loginReducer } from './containers/LoginPage';
import { productsPageReducer } from './containers/ProductsPage';
import { cartPageReducer } from './containers/CartPage';
import { shopsPageReducer } from './containers/ShopsPage';
import { categoriesPageReducer } from './components/CatalogModal';

export default combineReducers({
  loginReducer,
  productsPageReducer,
  cartPageReducer,
  shopsPageReducer,
  categoriesPageReducer,
});
