import { auth } from '@clerk/nextjs/server';
import { CardSignInButton } from '../form/Buttons';
import { getBookmarkId } from '@/utils/actions';
import BookmarkToggleForm from './BookmarkToggleForm';
async function BookmarkToggleButton({ campaignId }: { campaignId: string }) {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;
  const bookmarkId = await getBookmarkId({ campaignId });

  return <BookmarkToggleForm bookmarkId={bookmarkId} campaignId={campaignId} />;

}
export default BookmarkToggleButton;