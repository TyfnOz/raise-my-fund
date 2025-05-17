'use client';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useCampaign } from '@/utils/store';
import FormContainer from '@/components/form/FormContainer';
import { SubmitButton } from '@/components/form/Buttons';
import { createDonationAction } from '@/utils/actions';

function ConfirmDonation() {
  const { userId } = useAuth();
  const { campaignId} = useCampaign((state) => state);
  if (!userId)
    return (
      <SignInButton mode='modal'>
        <Button type='button' className='w-full'>
          Sign In to Complete Donation
        </Button>
      </SignInButton>
    );

  const createDonation = createDonationAction.bind(null, {
    campaignId
  });
  return (
    <section>
      <FormContainer action={createDonation}>
        <SubmitButton text='Donate' className='w-full' />
      </FormContainer>
    </section>
  );
}
export default ConfirmDonation;