import Link from 'next/link';
import { GiTakeMyMoney } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";

import { Button } from '../ui/button';
import Image from 'next/image';

function Logo() {
  return (
    <a href="/">
      <Image src='/logo.png' alt='logo' width={100} height={100}/>
    </a>
  );
}

export default Logo