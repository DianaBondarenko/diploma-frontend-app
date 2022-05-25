import { ProductData } from '../../containers/ProductsPage/types';

export interface CategoryData {
  id: string;
  name: string;
  parent_id: string | null;
}

export interface CategoryByIdData {
  id: string;
  name: string;
  parent_id: string | null;
  products: ProductData[];
}

export interface MappedCategoryData {
  id: string;
  name: string;
  parentId: string | null;
}

export interface CategoriesResponse {
  status: string;
  data: CategoryData[];
  results: number;
}

export interface CategoryByIdResponse {
  status: string;
  data: CategoryByIdData;
  results: number;
}

export interface CategoriesPageState {
  categoriesPage: {
    data: null | MappedCategoryData[];
    error: null | string;
    loading: boolean;
  };
}
