'use client';

import ConfirmDonation from './ConfirmDonation';
import DonationForm from './DonationForm';
function DonationContainer() {
  return (
    <div className='w-full'>
      <DonationForm />
      <ConfirmDonation />
    </div>
  );
}

export default DonationContainer;