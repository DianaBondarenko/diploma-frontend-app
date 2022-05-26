import {
  MappedProposalData,
  MappedShopData,
  ProposalData,
  ShopData,
} from './types';

export const mapProposalsData = (
  proposals: ProposalData[] | null
): MappedProposalData[] | null => {
  return proposals
    ? proposals.map((proposal) => {
        return {
          count: proposal.count,
          countDesired: proposal.count_desired,
          id: proposal.id,
          image: proposal.image,
          manufacturer: proposal.manufacturer,
          name: proposal.name,
          packing: proposal.packing,
          price: proposal.price,
          weight: proposal.weight,
        };
      })
    : null;
};

export const mapShopsData = (shops: ShopData[]): MappedShopData[] => {
  return shops.map((shop) => {
    return {
      ...shop,
      proposal: mapProposalsData(shop.proposal),
    };
  });
};
