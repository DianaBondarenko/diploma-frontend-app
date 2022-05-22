import { ProductData } from './types';

export const mapProductsData = (products: ProductData[]) => {
  return products.map((product) => {
    const lowestPrice = 9;
    return {
      ...product,
      categoryId: product.category_id,
      price: lowestPrice,
    };
  });
};
