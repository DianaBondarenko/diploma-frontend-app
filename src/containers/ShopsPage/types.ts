export type Coordinate = [number, number];

export interface ShopsData {
  id: string;
  name: string;
  address: string;
  schedule: string;
  owner: string;
  coordinates: Coordinate;
}

export interface MappedShopsData extends ShopsData {}

export interface ShopsResponse {
  status: string;
  data: ShopsData[];
  results: number;
}

export interface ShopsPageState {
  shopsPage: {
    data: null | MappedShopsData[];
    error: null | string;
    loading: boolean;
  };
}
