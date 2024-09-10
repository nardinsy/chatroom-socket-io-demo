import { FC } from "react";
import CommetnsList from "../CommentsList";
import { CommentDto } from "../../../helpers/dtos";

type CommentRepliesT = {
  replies: CommentDto[];
};

const CommentReplies: FC<CommentRepliesT> = ({ replies }) => {
  if (!replies || replies.length === 0) {
    return <></>;
  }

  return <CommetnsList comments={replies} />;
};

export default CommentReplies;
