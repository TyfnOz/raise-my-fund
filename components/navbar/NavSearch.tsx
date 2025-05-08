import { Input } from '../ui/input';

function NavSearch() {
  return (
    <Input
      type='search'
      placeholder='Look for a campaign'
      className='max-w-100 dark:bg-muted'
    />
  );
}
export default NavSearch;