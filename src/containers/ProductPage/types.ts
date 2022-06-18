export interface ProposalData {
  id: string;
  price: number;
}

export interface ProductData {
  id: string;
  category_id: string;
  name: string;
  image: string;
  manufacturer: string;
  packing: string;
  weight: string;
  proposals: ProposalData[];
}

export interface MappedProductData {
  id: string;
  categoryId: string;
  name: string;
  image: string;
  manufacturer: string;
  packing: string;
  weight: string;
  price: number;
  proposals: ProposalData[];
}

export interface ProductResponse {
  status: string;
  data: ProductData;
  results: number;
}

export interface ProductPageState {
  productPage: {
    data: null | MappedProductData;
    error: null | string;
    loading: boolean;
  };
}
