import { createContext, useState, FC } from "react";
import { WithChildren } from "../helpers/props";
import useRequiredBackend from "../hooks/use-required-backend";
import {
  CommentDto,
  CommentLikeDto,
  CommentReplyDto,
  NewComment,
} from "../helpers/dtos";

export interface CommentT {
  comments: CommentDto[];
  uploadNewCommetn: (newCommetn: NewComment) => Promise<void>;
  likeComment: (
    updatedComment: CommentDto,
    newLikeComment: CommentLikeDto
  ) => Promise<void>;
  replyToComment: (
    parentCommentDto: CommentDto,
    commentReply: CommentReplyDto
  ) => Promise<void>;
  commentActionTo: string;
}

const CommentContext = createContext<CommentT | undefined>(undefined);

export const CommentContextProvider: FC<
  WithChildren<{ commentActionTo: string }>
> = ({ children, commentActionTo }) => {
  const backend = useRequiredBackend();

  const [comments, setCommetns] = useState<CommentDto[]>([]);

  const findAndUpdateComment = (comment: CommentDto) => {
    const commentIndex = comments.findIndex((cm) => cm.id === comment.id);
    comments[commentIndex] = comment;

    setCommetns((pre) => [...pre]);
  };

  const uploadNewCommetn = async (newCommetn: NewComment) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Please login first");
    }

    const result = await backend.addComment(newCommetn, commentActionTo, token);
    const comment = result.comment;

    setCommetns((pre) => [comment, ...pre]);
  };

  const likeComment = async (
    updatedComment: CommentDto,
    newCommentLike: CommentLikeDto
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Please login first");
    }
    await backend.likeComment(newCommentLike, commentActionTo, token);

    findAndUpdateComment(updatedComment);
  };

  const replyToComment = async (
    parentCommentDto: CommentDto,
    commentReply: CommentReplyDto
  ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Please login first");
    }

    const { replyComment } = await backend.replyComment(
      commentReply,
      commentActionTo,
      token
    );

    parentCommentDto.replies.unshift(replyComment);
    findAndUpdateComment(parentCommentDto);
  };

  const findParentComment = (
    commentsList: CommentDto[],
    parentId: string,
    nestingKey = "replies"
  ): any =>
    commentsList.reduce((a, item) => {
      if (a) return a;
      if (item.id === parentId) return item;
      if (item.replies)
        return findParentComment(item.replies, parentId, nestingKey);
    }, null);

  const value: CommentT = {
    comments,
    uploadNewCommetn,
    likeComment,
    replyToComment,
    commentActionTo,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};

export default CommentContext;
