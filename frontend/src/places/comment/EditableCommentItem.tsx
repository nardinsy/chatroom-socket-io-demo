import { FC, MouseEvent, useState } from "react";
import { CommentDto } from "../../helpers/dtos";
import useRequiredCommentContext from "../../hooks/use-required-commentContext";
import Textare from "./textarea/Textarea";
import CommentItem from "./CommentItem";

type EditableCommentItemT = {
  commentDto: CommentDto;
};

const EditableCommentItem: FC<EditableCommentItemT> = ({ commentDto }) => {
  const commentContext = useRequiredCommentContext();
  const [activeEditingMode, setActiveEditingMode] = useState(false);

  const { id, text } = commentDto;

  const editButtonClickHandler = (event: any) => {
    event.preventDefault();
    setActiveEditingMode(true);
  };

  const deleteButtonClickHandler = async (event: MouseEvent<HTMLElement>) => {
    await commentContext.deleteComment(id, commentDto.parentId);
  };

  const editComment = async (text: string) => {
    commentDto.text = text;
    commentDto.date = new Date().toDateString();

    await commentContext.editComment(commentDto);
  };

  const commentText = text.split("\n").map((item, index) => {
    return (
      <span key={index}>
        {item}
        <br />
      </span>
    );
  });

  const items = [
    { title: "Edit", handler: editButtonClickHandler },
    {
      title: "Delete",
      handler: deleteButtonClickHandler,
    },
  ];

  return (
    <CommentItem commentDto={commentDto} items={items}>
      {activeEditingMode ? (
        <Textare
          text={text}
          onSubmit={editComment}
          closeTextarea={async () => setActiveEditingMode(false)}
        />
      ) : (
        <div className="text-sm text-gray-dark">{commentText}</div>
      )}
    </CommentItem>
  );
};

export default EditableCommentItem;
