'use client';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Donation } from '@/utils/types';

const DynamicDonationWrapper = dynamic(
    () => import('@/components/donations/DonationWrapper'),
    {
        ssr: false,
        loading: () => <Skeleton className='h-[200px] w-full' />,
    }
);

type BookingWrapperProps = {
  campaignId: string;
  price: number;
  donations: Donation[];
};

export default function BookingWrapperClient({ campaignId, price, donations }: BookingWrapperProps) {
    return <DynamicDonationWrapper  campaignId={campaignId} price={price} donations={donations}/>;
  }