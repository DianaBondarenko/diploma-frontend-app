import { CategoryData, MappedCategoryData } from './types';

export const mapCategoriesData = (
  categories: CategoryData[]
): MappedCategoryData[] => {
  return categories.map((category) => {
    return {
      id: category.id,
      parentId: category.parent_id,
      name: category.name,
    };
  });
};
