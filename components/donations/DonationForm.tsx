import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCampaign } from '@/utils/store';
import { formatCurrency } from '@/utils/format';
function DonationForm() {
  const { price } = useCampaign((state) => state);

  const tax = price * 0.1;
  const orderTotal = price + tax;

  return (
    <Card className='p-8 mb-4'>
      <CardTitle className='mb-8'>Summary </CardTitle>
      <FormRow label={`$${price}`} amount={price} />
      <FormRow label='Tax' amount={tax} />
      <Separator className='mt-4' />
      <CardTitle className='mt-8'>
        <FormRow label='Payment Total' amount={orderTotal} />
      </CardTitle>
    </Card>
  );
}

function FormRow({ label, amount }: { label: string; amount: number }) {
  return (
    <p className='flex justify-between text-sm mb-2'>
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  );
}

export default DonationForm;