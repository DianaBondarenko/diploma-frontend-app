import { Coordinate } from '../../global/types';

export interface ProposalData {
  count: number;
  count_desired: number;
  id: string;
  image: string;
  manufacturer: string;
  name: string;
  packing: string;
  price: number;
  weight: string;
}

export interface MappedProposalData {
  count: number;
  countDesired: number;
  id: string;
  image: string;
  manufacturer: string;
  name: string;
  packing: string;
  price: number;
  weight: string;
}

export interface ShopData {
  id: string;
  name: string;
  address: string;
  schedule: string;
  owner: string;
  coordinates: Coordinate;
  proposal: ProposalData[] | null;
}

export interface MappedShopData {
  id: string;
  name: string;
  address: string;
  schedule: string;
  owner: string;
  coordinates: Coordinate;
  proposal: MappedProposalData[] | null;
}

export interface ShopsResponse {
  status: string;
  data: ShopData[];
}

export interface ShopsPageState {
  shopsPage: {
    data: null | MappedShopData[];
    error: null | string;
    loading: boolean;
  };
}
