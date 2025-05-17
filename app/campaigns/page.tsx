import EmptyList from '@/components/home/EmptyList';
import { getOwnedCampaigns, deleteCampaignAction } from '@/utils/actions';
import Link from 'next/link';

import { formatCurrency, formatDate } from '@/utils/format';
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

async function CampaignsPage() {
  const campaigns = await getOwnedCampaigns();

  if (campaigns.length === 0) {
    return (
      <EmptyList
        heading='No owned fundraises to display.'
        message="Don't hesitate to raise a fund."
      />
    );
  }

  return (
    <div className='mt-16'>
      <h4 className='mb-4 capitalize'>Active Fundraises : {campaigns.length}</h4>
      <Table>
        <TableCaption>A list of all your campaigns.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total Income</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => {
            const { id: campaignId, name, price, createdAt } = campaign;
            const { orderTotalSum } = campaign;
            return (
              <TableRow key={campaignId}>
                <TableCell>
                  <Link
                    href={`/fundraises/${campaignId}`}
                    className='underline text-muted-foreground tracking-wide'
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell>{formatCurrency(orderTotalSum)}</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>

                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/campaigns/${campaignId}/edit`}>
                    <IconButton actionType='edit'></IconButton>
                  </Link>
                  <DeleteCampaign campaignId={campaignId} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function DeleteCampaign({ campaignId }: { campaignId: string }) {
  const deleteCampaign = deleteCampaignAction.bind(null, { campaignId });
  return (
    <FormContainer action={deleteCampaign}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
}

export default CampaignsPage;