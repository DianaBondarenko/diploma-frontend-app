import { DeliveryType, PaymentMethod } from '../../global/types';

export const DELIVERY_TYPES: {
  [key in DeliveryType]: { label: string; icon?: string };
} = {
  [DeliveryType.DELIVERY]: { label: 'Доставка' },
  [DeliveryType.PICK_UP]: { label: 'Самовивіз' },
};

export const PAYMENT_METHODS: {
  [key in PaymentMethod]: { label: string; icon?: string };
} = {
  [PaymentMethod.ON_DELIVERY]: { label: 'При отриманні' },
};

export const DEFAULT_CITY = 'Львів';

export const PICK_UP_ADDRESS_STATE = {
  address: '',
  city: DEFAULT_CITY,
  entrance: '',
  flat: '',
  floor: 0,
  is_default: false,
};

export const INITIAL_ORDER_FORM_STATE = {
  phone: '+380',
  address: '',
  apartmentsNumber: '',
  enterNumber: '',
  floorNumber: '',
  comment: '',
  id: '',
  deliveryType: DeliveryType.DELIVERY,
  paymentMethod: PaymentMethod.ON_DELIVERY,
  agreementAccepted: false,
  addressSaved: false,
};

export const getAddressData = (state: any) => {
  return {
    address: state.address,
    city: DEFAULT_CITY,
    entrance: state.enterNumber,
    flat: state.apartmentsNumber,
    floor: state.florNumber,
    id: state.id,
  };
};
