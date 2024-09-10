import { FC } from "react";
import { CommentDto } from "../../../helpers/dtos";
import CommentReplyTextarea from "./CommentReplyTextarea";
import CommentReplies from "./CommentReplies";
import useRequiredAuthContext from "../../../hooks/use-required-authContext";

type ReplyT = {
  commentDto: CommentDto;
  closeReplyTextarea: () => void;
  showReplyTextarea: boolean;
};

const Reply: FC<ReplyT> = ({
  commentDto,
  showReplyTextarea,
  closeReplyTextarea,
}) => {
  const authCtx = useRequiredAuthContext();

  return (
    <>
      {authCtx.isLoggedin && showReplyTextarea && (
        <div className="ml-2">
          <CommentReplyTextarea
            commentDto={commentDto}
            closeReplyTextarea={closeReplyTextarea}
            loggedUserUserId={authCtx.userId}
          />
        </div>
      )}
      <div className="pl-4">
        <CommentReplies replies={commentDto.replies} />
      </div>
    </>
  );
};

export default Reply;
