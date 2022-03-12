import { combineReducers } from 'redux';
import { loginReducer } from './containers/LoginPage';
import { ordersPageReducer } from './containers/OrdersPage';

export default combineReducers({
  loginReducer,
  ordersPageReducer,
});
