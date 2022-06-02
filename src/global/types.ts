import { LoginState } from '../containers/LoginPage/types';
import { ProductsPageState } from '../containers/ProductsPage/types';
import { CartPageState } from '../containers/CartPage/types';
import { ShopsPageState } from '../containers/ShopsPage/types';
import { OrderPageState } from '../containers/OrderPage/types';
import { CategoriesPageState } from '../components/CatalogModal/types';

export interface AppState {
  loginReducer: LoginState;
  productsPageReducer: ProductsPageState;
  cartPageReducer: CartPageState;
  shopsPageReducer: ShopsPageState;
  categoriesPageReducer: CategoriesPageState;
  orderPageReducer: OrderPageState;
}

export type Coordinate = [number, number];

export enum DeliveryType {
  DELIVERY = 'DELIVERY',
  PICK_UP = 'PICK_UP',
}

export enum PaymentMethod {
  ON_DELIVERY = 'ON_DELIVERY',
}
