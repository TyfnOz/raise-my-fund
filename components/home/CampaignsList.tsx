import CampaignCard from '../card/CampaignCard';
import type { CampaignCardProps } from '@/utils/types';

function CampaignsList({ campaigns }: { campaigns: CampaignCardProps[] }) {
  return (
    <section className='mt-4 gap-8 grid sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4'>
      {campaigns.map((campaign) => {
        return <CampaignCard key={campaign.id} campaign={campaign} />;
      })}
    </section>
  );
}
export default CampaignsList;