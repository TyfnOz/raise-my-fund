import BookmarkToggleButton from '@/components/card/BookmarkToggleButton';
import BreadCrumbs from '@/components/fundraises/BreadCrumbs';
import { getCampaignDetails } from '@/utils/actions';
import { redirect } from 'next/navigation';

async function CampaignDetailsPage({ params }: { params: { id: string } }) {
  const campaign = await getCampaignDetails(params.id);
  if (!campaign) redirect('/');
  return (
    <section>
      <BreadCrumbs name={campaign.name} />
      <header className='flex justify-between items-center mt-4'>
        <h1 className='text-4xl font-bold '>{campaign.tagline}</h1>
        <div className='flex items-center gap-x-4'>
          {/* share button */}
          <BookmarkToggleButton campaignId={campaign.id} />
        </div>
      </header>
    </section>
  );
}
export default CampaignDetailsPage;