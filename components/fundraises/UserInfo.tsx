import Image from 'next/image';

type UserInfoProps = {
  profile: {
    profileImage: string;
    firstName: string;
  };
};

function UserInfo({ profile: { profileImage, firstName } }: UserInfoProps) {
  return (
    <article className='mt-4'>
      <div className='flex items-center gap-4'>
        <Image
          src={profileImage}
          alt={firstName}
          width={50}
          height={50}
          className='rounded w-12 h-12 object-cover'
        />
        <div>
          <p>
            Raised by <span className='font-bold'>{firstName}</span>
          </p>
          <p className='text-muted-foreground font-light'>
            SuperRaiser &middot; 2 years raising
          </p>
        </div>
      </div>
    </article>
  );
}
export default UserInfo;