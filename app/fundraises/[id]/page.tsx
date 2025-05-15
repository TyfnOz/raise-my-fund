import BookmarkToggleButton from '@/components/card/BookmarkToggleButton';
import CampaignComments from '@/components/comments/CampaignComments';
import SubmitComment from '@/components/comments/SubmitComment';
import BreadCrumbs from '@/components/fundraises/BreadCrumbs';
import Description from '@/components/fundraises/Description';
import ImageContainer from '@/components/fundraises/ImageContainer';
import UserInfo from '@/components/fundraises/UserInfo';
import { Separator } from '@/components/ui/separator';
import { findExistingComment, getCampaignDetails } from '@/utils/actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

type Params = Promise<{ id: string }>

async function CampaignDetailsPage(props: { params: Params }) {
  const params = await props.params;
  const campaign = await getCampaignDetails(params.id);
  if (!campaign) redirect('/');
  const firstName = campaign.profile.firstName;
  const profileImage = campaign.profile.profileImage;
  const {userId} = auth();
  const isNotOwner = campaign.profile.clerkId !== userId;
  const reviewDoesNotExist = userId && isNotOwner 
        && !(await findExistingComment(userId,campaign.id));
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
      <ImageContainer mainImage={campaign.image} name={campaign.name} />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-12">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{campaign.name}</h1>
          </div>
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className="mt-4" />
          <Description description={campaign.description} />
        </div>
      </section>
      {reviewDoesNotExist && <SubmitComment campaignId={campaign.id}/>}
        <CampaignComments campaignId={campaign.id}/>
    </section>
  );
}
export default CampaignDetailsPage;