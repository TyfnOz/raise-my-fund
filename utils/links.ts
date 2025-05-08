type NavLink = {
    href: string;
    label: string;
  };
  
  export const links: NavLink[] = [
    { href: '/', label: 'home' },
    { href: '/bookmarks ', label: 'bookmarks' },
    { href: '/payments ', label: 'payments' },
    { href: '/supportive-comments ', label: 'supportive-comments' },
    { href: '/campaigns/create ', label: 'create campaign' },
    { href: '/campaigns', label: 'my campaigns' },
    { href: '/profile ', label: 'profile' },
  ];