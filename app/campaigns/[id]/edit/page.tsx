import {
  getFundraiseDetails,
  updateCampaignImageAction,
  updateCampaignAction,
} from '@/utils/actions';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CountriesInput from '@/components/form/CountriesInput';
import { SubmitButton } from '@/components/form/Buttons';
import { redirect } from 'next/navigation';
import ImageInputContainer from '@/components/form/ImageInputContainer';

type Params = Promise<{ id: string }>

async function EditCampaignPage(props:{params:Params}) {
  const params = await props.params;
  const campaign = await getFundraiseDetails(params.id);

  if (!campaign) redirect('/');

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Edit Fundraise</h1>
      <div className='border p-8 rounded-md '>
        <ImageInputContainer
          name={campaign.name}
          text='Update Image'
          action={updateCampaignImageAction}
          image={campaign.image}
        >
          <input type='hidden' name='id' value={campaign.id} />
        </ImageInputContainer>

        <FormContainer action={updateCampaignAction}>
          <input type='hidden' name='id' value={campaign.id} />
          <div className='grid md:grid-cols-2 gap-8 mb-4 mt-8'>
            <FormInput
              name='name'
              type='text'
              label='Name (20 limit)'
              defaultValue={campaign.name}
            />
            <FormInput
              name='tagline'
              type='text '
              label='Tagline (30 limit)'
              defaultValue={campaign.tagline}
            />
            <PriceInput defaultValue={campaign.price} />
            <CategoriesInput defaultValue={campaign.category} />
            <CountriesInput defaultValue={campaign.country} />
          </div>

          <TextAreaInput
            name='description'
            labelText='Description (10 - 100 Words)'
            defaultValue={campaign.description}
          />
          <SubmitButton text='edit fundraise' className='mt-12' />
        </FormContainer>
      </div>
    </section>
  );
}
export default EditCampaignPage;