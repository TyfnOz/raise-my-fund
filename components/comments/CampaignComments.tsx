import { getCampaignComments } from "@/utils/actions";
import Title from "../fundraises/Title";
import CommentCard from "./CommentCard";

async function CampaignComments({campaignId}:{campaignId:string}) {
  const comments = await getCampaignComments(campaignId);
  if(comments.length < 1) return null;

  return (
    <div className="mt-8">
      <Title text="Reviews" />
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {comments.map((cmt) => {
          const {comment} = cmt;
          const {firstName, profileImage} = cmt.profile;
          const commentInfo = {
            comment, name:firstName, image:profileImage
          };

          return <CommentCard key={cmt.id} commentInfo={commentInfo}/>
        })}
      </div>
    </div>
  )
}

export default CampaignComments;