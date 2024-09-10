import { useContext } from "react";
import CommentContext from "../contexts/comment-contex";

const useRequiredCommentContext = () => {
  const commentCtx = useContext(CommentContext);
  if (!commentCtx) {
    throw new Error(
      "Component that uses CommentContext should be weapped by CommentContextProvider"
    );
  }

  return commentCtx;
};

export default useRequiredCommentContext;
