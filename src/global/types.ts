import { LoginState } from '../containers/LoginPage/types';
import { ProductsPageState } from '../containers/ProductsPage/types';
import { CartPageState } from '../containers/CartPage/types';

export interface AppState {
  loginReducer: LoginState;
  productsPageReducer: ProductsPageState;
  cartPageReducer: CartPageState;
}
