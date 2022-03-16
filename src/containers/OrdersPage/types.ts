export enum OrderStatus {
  UNCONFIRMED = 'unconfirmed',
  COLLECTING = 'collecting',
  READY = 'ready',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export enum DeliveryType {
  DELIVERY = 'delivery',
  SELF = 'self',
}

export enum PaymentType {
  KASPI_PAY = 'kaspi_pay',
  IN_PLACE = 'in_place',
}

export interface OrderData {
  anonymous: boolean;
  cancel_message: string;
  created_at: string;
  delivery_method: 'self' | 'delivery_yandex';
  delivery_price: number;
  order_number: string;
  payment_method: 'kaspi' | 'in_place';
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

export interface OrderResponseData {
  order: OrderData;
  source: OrderSourceData;
}

export interface OrdersResponse {
  status: string;
  result: OrderResponseData[];
}

export interface ProductResponseItemCustomAttributesProps {
  attribute_code: string;
  value: string;
}

export interface ProductResponseItem {
  attribute_set_id: number;
  created_at: string;
  id: string | number;
  name: string;
  price: number;
  sku: string;
  status: number;
  type_id: string;
  updated_at: string;
  visibility: number;
  custom_attributes: ProductResponseItemCustomAttributesProps[];
}

export interface ProductsResponse {
  items: ProductResponseItem[];
}

export interface OrderTableProductData {
  amount: string;
  sku: string;
  name: string;
  quantity: number;
  packing: string;
  manufacturer: string;
  needsRecipe: boolean;
  vendorCode: string;
}

export interface OrderTableData {
  phone: string;
  orderNumber: string;
  createdAt: string;
  diffMsTimer: number;
  amount: string;
  status: OrderStatus;
  paymentType: PaymentType;
  deliveryType: DeliveryType;
  products: OrderTableProductData[];
}

export interface OrdersPageState {
  ordersPage: {
    data: null | OrderTableData[];
    error: null | string;
    loading: boolean;
  };
  ordersSearchModal: {
    data: any; // TODO: add correct type
    error: null | string;
    loading: boolean;
  };
}
