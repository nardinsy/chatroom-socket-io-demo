import { FC } from "react";
import { CommentDto } from "../../helpers/dtos";
import CommentItem from "./CommentItem";

type CommentItemT = {
  commentDto: CommentDto;
};

const NotEditableCommentItem: FC<CommentItemT> = ({ commentDto }) => {
  const { text } = commentDto;

  const commentText = text.split("\n").map((item, index) => {
    return (
      <span key={index}>
        {item}
        <br />
      </span>
    );
  });

  return (
    <CommentItem commentDto={commentDto}>
      <div className="text-sm text-gray-dark">{commentText}</div>
    </CommentItem>
  );
};

export default NotEditableCommentItem;
