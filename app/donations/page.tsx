import EmptyList from '@/components/home/EmptyList';
import CountryFlagAndName from '@/components/card/CountryFlagAndName';
import Link from 'next/link';

import { formatDate, formatCurrency } from '@/utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';
import { getDonations, deleteDonationAction } from '@/utils/actions';

async function DonationsPage() {
  const donations = await getDonations();
  if (donations.length === 0) {
    return <EmptyList />;
  }
  return (
    <div className='mt-16'>
      <h4 className='mb-4 capitalize'>total donations : {donations.length}</h4>
      <Table>
        <TableCaption>A list of your recent donations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donations.map((donation) => {
            const { id, orderTotal, createdAt } = donation;
            const { id: campaignId, name, country } = donation.campaign;
            const date = formatDate(createdAt);
            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/fundraises/${campaignId}`}
                    className='underline text-muted-foreground tracking-wide'
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>
                  <CountryFlagAndName countryCode={country} />
                </TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>
                  <DeleteDonation donationId={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function DeleteDonation({ donationId }: { donationId: string }) {
  const deleteDonation = deleteDonationAction.bind(null, { donationId });
  return (
    <FormContainer action={deleteDonation}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
}

export default DonationsPage;