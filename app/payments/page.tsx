import { getPayments } from '@/utils/actions';
import Link from 'next/link';
import EmptyList from '@/components/home/EmptyList';
import CountryFlagAndName from '@/components/card/CountryFlagAndName';

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

async function PaymentsPage() {
  const payments = await getPayments();

  if (payments.length === 0) {
    return <EmptyList />;
  }

  return (
    <div className='mt-16'>
      <h4 className='mb-4 capitalize'>
        total donations : {payments.length}
      </h4>
      <Table>
        <TableCaption>A list of your recent donations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((item) => {
            const { id, orderTotal, createdAt } = item;
            const { id: campaignId, name, country } = item.campaign;
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
export default PaymentsPage;