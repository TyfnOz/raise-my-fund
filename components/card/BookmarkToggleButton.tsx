import { FaBookmark } from "react-icons/fa";
import { Button } from '@/components/ui/button';
function BookmarkToggleButton({ campaignId }: { campaignId: string }) {
  return (
    <Button size='icon' variant='outline' className='p-2 cursor-pointer'>
      <FaBookmark />
    </Button>
  );
}
export default BookmarkToggleButton;