import { combineReducers } from 'redux';
import { loginReducer } from './containers/LoginPage';
import { productsPageReducer } from './containers/ProductsPage';
import { cartPageReducer } from './containers/CartPage';

export default combineReducers({
  loginReducer,
  productsPageReducer,
  cartPageReducer,
});
