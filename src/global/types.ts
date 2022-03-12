import { LoginState } from '../containers/LoginPage/types';
import { OrdersPageState } from '../containers/OrdersPage/types';

export interface AppState {
  loginReducer: LoginState;
  ordersPageReducer: OrdersPageState;
}
