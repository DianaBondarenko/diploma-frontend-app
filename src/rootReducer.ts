import { combineReducers } from 'redux';
import { loginReducer } from './containers/LoginPage';
import { productsPageReducer } from './containers/ProductsPage';

export default combineReducers({
  loginReducer,
  productsPageReducer,
});
