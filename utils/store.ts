import { create } from 'zustand';
import { Donation } from './types';
// Define the state's shape
type CampaignState = {
  campaignId: string;
  price: number;
  donations: Donation[];
};

// Create the store
export const useCampaign = create<CampaignState>(() => {
  return {
    campaignId: '',
    price: 0,
    donations: []
  };
});