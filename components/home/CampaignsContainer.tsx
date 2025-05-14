import { getCampaigns } from '@/utils/actions';
import CampaignsList from './CampaignsList';
import EmptyList from './EmptyList';
import type { CampaignCardProps } from '@/utils/types';

async function CampaignsContainer({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const campaigns: CampaignCardProps[] = await getCampaigns({
    category,
    search,
  });

  if (campaigns.length === 0) {
    return (
      <EmptyList
        heading='No results.'
        message='Try changing or removing some of your filters.'
        btnText='Clear Filters'
      />
    );
  }

  return <CampaignsList campaigns={campaigns} />;
}
export default CampaignsContainer;