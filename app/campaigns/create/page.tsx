import FormInput from '@/components/form/FormInput';
import FormContainer from '@/components/form/FormContainer';
import { createCampaignAction } from '@/utils/actions';
import { SubmitButton } from '@/components/form/Buttons';
import PriceInput from '@/components/form/PriceInput';
import CategoriesInput from '@/components/form/CategoriesInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import CountriesInput from '@/components/form/CountriesInput';
import ImageInput from '@/components/form/ImageInput';

function CreateCampaign() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        create campaign
      </h1>
      <div className='border p-8 rounded-md'>
        <h3 className='text-lg mb-4 font-medium'>General Info</h3>
        <FormContainer action={createCampaignAction}>
          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormInput
              name='name'
              type='text'
              label='Name (20 limit)'
              defaultValue='I start my campaign'
            />
            <FormInput
              name='tagline'
              type='text '
              label='Tagline (30 limit)'
              defaultValue='I raise my fund!'
            />
            {/* price */}
            <PriceInput />
            {/* categories */}
            <CategoriesInput />
          </div>
          {/* text area / description */}
          <TextAreaInput name='description' labelText='Description (10 - 1000 Words)' />
          <div className='grid sm:grid-cols-2 gap-8 mt-4'>
            <CountriesInput />
            <ImageInput />
          </div>
          <SubmitButton text='create campaign' className='mt-12 cursor-pointer' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateCampaign;