export interface OrdersPageState {
  ordersPage: {
    data: any; // TODO: add correct type
    error: null | string;
    loading: boolean;
  };
  ordersSearchModal: {
    data: any; // TODO: add correct type
    error: null | string;
    loading: boolean;
  };
  orderDetailsModal: {
    data: any; // TODO: add correct type
    error: null | string;
    loading: boolean;
  };
}

export interface OrderData {
  anonymous: boolean;
  cancel_message: string;
  created_at: string;
  delivery_method: string;
  delivery_price: number;
  order_number: string;
  payment_method: string;
  phone: string;
  source: string;
  status: {
    backoffice_status: string;
    pharmacy_status: string;
  };
  items: {
    base_price: number;
    name: string;
    part_id: number;
    price_with_warehouse_discount: number;
    quantity: number;
    sku: string;
    source_code: string;
    warehouse_discount: number;
  }[];
}

export interface OrderSourceData {
  address: string;
  bin: string;
  code: string;
  lat: number;
  lon: number;
  name: string;
  opening_hours: string;
}

export interface OrdersResponse {
  status: string;
  result: {
    data: {
      order: OrderData;
      source: OrderSourceData;
    }[];
  };
}
