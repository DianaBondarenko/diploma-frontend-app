import { ProductData } from './types';

export const mapProductData = (product: ProductData) => {
  const lowestPrice = product.proposals?.reduce(
    (prev, cur) => (prev < cur.price ? prev : cur.price),
    product.proposals[0]?.price
  );

  const {
    id,
    image,
    category_id,
    name,
    weight,
    packing,
    manufacturer,
    proposals,
  } = product;

  return {
    id,
    name,
    image,
    categoryId: category_id,
    manufacturer,
    packing,
    weight,
    price: lowestPrice || 0,
    proposals,
  };
};
