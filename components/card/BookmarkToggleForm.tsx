'use client';

import { usePathname } from 'next/navigation';
import FormContainer from '../form/FormContainer';
import { toggleBookmarkAction } from '@/utils/actions';
import { CardSubmitButton } from '../form/Buttons';

type FavoriteToggleFormProps = {
  campaignId: string;
  bookmarkId: string | null;
};

function FavoriteToggleForm({
  campaignId,
  bookmarkId,
}: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleBookmarkAction.bind(null, {
    campaignId,
    bookmarkId,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isBookmark={bookmarkId ? true : false} />
    </FormContainer>
  );
}
export default FavoriteToggleForm;