import EmptyList from '@/components/home/EmptyList';
import {
  deleteCommentAction,
  getCampaignCommentsByUser,
} from '@/utils/actions';
import CommentCard from '@/components/comments/CommentCard';
import Title from '@/components/fundraises/Title';
import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';
async function CommentsPage() {
  const comments = await getCampaignCommentsByUser();
  if (comments.length === 0) return <EmptyList />;

  return (
    <>
      <Title text='Your Reviews' />
      <section className='grid md:grid-cols-2 gap-8 mt-4 '>
        {comments.map((cmt) => {
          const { comment } = cmt;
          const { name, image } = cmt.campaign;
          const commentInfo = {
            comment,
            name,
            image,
          };
          return (
            <CommentCard key={cmt.id} commentInfo={commentInfo}>
              <DeleteReview commentId={cmt.id} />
            </CommentCard>
          );
        })}
      </section>
    </>
  );
}

const DeleteReview = ({ commentId }: { commentId: string }) => {
  const deleteReview = deleteCommentAction.bind(null, { commentId });
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
};

export default CommentsPage;