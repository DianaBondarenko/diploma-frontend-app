import { ProductData } from './types';

export const mapProductsData = (products: ProductData[]) => {
  return products.map((product) => {
    const lowestPrice = product.proposals?.reduce(
      (prev, cur) => (prev < cur.price ? prev : cur.price),
      product.proposals[0]?.price
    );

    return {
      ...product,
      categoryId: product.category_id,
      price: lowestPrice || 0,
    };
  });
};
