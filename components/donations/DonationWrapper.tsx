'use client';

import { useCampaign } from '@/utils/store';
import { Donation } from '@/utils/types';
import DonationContainer from './DonationContainer';
import { useEffect } from 'react';

type BookingWrapperProps = {
  campaignId: string;
  price: number;
  donations: Donation[];
};
export default function BookingWrapper({
  campaignId,
  price,
  donations,
}: BookingWrapperProps) {
  useEffect(() => {
    useCampaign.setState({
      campaignId,
      price,
      donations,
    });
  }, []);
  return (
    <>
      <DonationContainer />
    </>
  );
}