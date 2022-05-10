import { LoginState } from '../containers/LoginPage/types';
import { ProductsPageState } from '../containers/ProductsPage/types';

export interface AppState {
  loginReducer: LoginState;
  productsPageReducer: ProductsPageState;
}
