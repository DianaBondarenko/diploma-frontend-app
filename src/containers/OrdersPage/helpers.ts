import { OrderResponseData, ProductResponseItem } from './types';
import { formatTime } from '../../global/helpers';
import {
  orderDeliveryTypesStrategy,
  orderPaymentTypesStrategy,
  orderStatusesStrategy,
} from './constants';

export const getOrderTimer = (diffMs: number) => {
  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor(
    Math.round(((diffMs % 86400000) % 3600000) / 60000)
  );
  return `${hours > 9 ? hours : `0${hours}`}:${
    minutes > 9 ? minutes : `0${minutes}`
  }`;
};

export const mapDataForOrdersPageTable = (
  data: OrderResponseData[],
  productsData: ProductResponseItem[]
) => {
  return data
    .map((item) => {
      return {
        orderNumber: `№${item.order.order_number}`,
        phone: `+${item.order.phone}`,
        createdAt: formatTime(item.order.created_at),
        diffMsTimer:
          new Date().getTime() - new Date(item.order.created_at).getTime(),
        amount: `${item.order.items.reduce((accum, product) => {
          return (
            accum + product.price_with_warehouse_discount * product.quantity
          );
        }, 0)} ₸`,
        // @ts-ignore
        status: orderStatusesStrategy[item.order.status.backoffice_status],
        deliveryType: orderDeliveryTypesStrategy[item.order.delivery_method],
        paymentType: orderPaymentTypesStrategy[item.order.payment_method],
        products: item.order.items.map((product) => {
          const productData = productsData.find(
            (productItem) => productItem.sku === product.sku
          );
          return {
            name: product.name,
            sku: product.sku,
            amount: `${
              product.quantity * product.price_with_warehouse_discount
            } ₸`,
            quantity: product.quantity,
            vendorCode: productData
              ? productData.custom_attributes.find(
                  (attribute) => attribute.attribute_code === 'ndda_num'
                )?.value || ''
              : '',
            packing: productData
              ? productData.custom_attributes.find(
                  (attribute) => attribute.attribute_code === 'pp_packing'
                )?.value || ''
              : '',
            manufacturer: productData
              ? productData.custom_attributes.find(
                  (attribute) => attribute.attribute_code === 'manufacturer_id'
                )?.value || ''
              : '',
            needsRecipe: productData
              ? Boolean(
                  Number(
                    productData.custom_attributes.find(
                      (attribute) =>
                        attribute.attribute_code === 'recipe_needed'
                    )?.value
                  )
                ) || false
              : false,
          };
        }),
      };
    })
    .sort((a, b) => a.diffMsTimer - b.diffMsTimer);
};
