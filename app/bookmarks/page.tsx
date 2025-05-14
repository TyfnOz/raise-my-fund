import CampaignsList from '@/components/home/CampaignsList';
import EmptyList from '@/components/home/EmptyList';
import { getBookmarks } from '@/utils/actions';

async function BookmarksPage() {
  const bookmarks = await getBookmarks();

  if (bookmarks.length === 0) {
    return <EmptyList />;
  }

  return <CampaignsList campaigns={bookmarks} />;
}
export default BookmarksPage;