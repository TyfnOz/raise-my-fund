import Link from 'next/link';
import Image from 'next/image';

function Logo() {
  return (
    <Link href="/">
      <Image src='/logo.png' alt='logo' width={100} height={100}/>
    </Link>
  );
}

export default Logo