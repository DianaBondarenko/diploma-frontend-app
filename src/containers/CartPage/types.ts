export interface ProductInCartData {
  id: string;
  name: string;
  image?: string;
  manufacturer?: string;
  packing?: string;
  weight?: string;
  price: number;
  countDesired: number;
}

export type Cart = ProductInCartData[];

export interface CartPageState {
  cartPage: {
    products: Cart;
  };
}
