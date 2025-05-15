import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Comment from './Comment';
type CommentCardProps = {
  commentInfo: {
    comment: string;
    name: string;
    image: string;
  };
  children?: React.ReactNode;
};

function CommentCard({commentInfo, children}:CommentCardProps) {
  return (
    <Card className='relative'>
      <CardHeader>
        <div className='flex items-center'>
          <img src={commentInfo.image} alt='profile' className='w-12 h-12 rounded-full object-cover' />
          <div className='ml-4'>
            <h3 className='text-sm font-bold capitalize mb-1'>
              {commentInfo.name}
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={commentInfo.comment} />
      </CardContent>
      <div className='absolute top-3 right-3'>
        {children}
      </div>
    </Card>
  )
}

export default CommentCard;