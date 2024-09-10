import { useEffect } from "react";
import CommentInput from "./CommentInput";
import CommetnsList from "./CommentsList";
import useRequiredAuthContext from "../../hooks/use-required-authContext";
import useRequiredCommentContext from "../../hooks/use-required-commentContext";

const CommentBox = ({ placeId }: { placeId: string }) => {
  const authContext = useRequiredAuthContext();
  const commentContext = useRequiredCommentContext();

  useEffect(() => {
    const getComments = async () => {
      await commentContext.getCommetns(placeId);
    };
    getComments();
    return () => {};
  }, [placeId]);

  return (
    <>
      <div className="px-2">
        <h3 className="text-xl pb-2">Comments</h3>
        <div className="mb-40">
          <CommetnsList comments={commentContext.comments} />
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-20 flex justify-center items-center bg-white z-30">
        {authContext.isLoggedin && <CommentInput placeId={placeId} />}
      </div>
    </>
  );
};

export default CommentBox;
