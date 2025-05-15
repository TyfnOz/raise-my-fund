'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import { LuShare2 } from 'react-icons/lu';

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  XIcon,
  EmailIcon,
  LinkedinIcon,
} from 'react-share';

function ShareButton({campaignId, name}:{campaignId:string; name:string;}) {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/fundraises/${campaignId}` 
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button  variant='outline' size='icon' className='p-2 cursor-pointer'>
                <LuShare2 />
            </Button>
        </PopoverTrigger>
        <PopoverContent side='top' align='end' sideOffset={10} 
            className='flex items-center gap-x-2 justify-center w-full'>
            <TwitterShareButton url={shareLink} title={name}>
                <XIcon size={32} round/>
            </TwitterShareButton>
            <WhatsappShareButton url={shareLink} title={name}>
                <WhatsappIcon size={32} round/>
            </WhatsappShareButton>
            <FacebookShareButton url={shareLink} title={name}>
                <FacebookIcon size={32} round/>
            </FacebookShareButton>
            <LinkedinShareButton url={shareLink} title={name}>
                <LinkedinIcon size={32} round/>
            </LinkedinShareButton>
            <EmailShareButton url={shareLink} title={name}>
                <EmailIcon size={32} round/>
            </EmailShareButton>
        </PopoverContent>
    </Popover>
  )
}

export default ShareButton;