import { ChangeEvent, KeyboardEvent, FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { NewComment } from "../../helpers/dtos";
import useRequiredCommentContext from "../../hooks/use-required-commentContext";

type CommentInputT = {
  placeId: string;
};

const CommentInput: FC<CommentInputT> = ({ placeId }) => {
  const commentContext = useRequiredCommentContext();

  const [commentInput, setCommentInput] = useState("");
  const [submitButtonIsActive, setSubmitButtonIsActive] = useState(false);

  const commentInputChangeHandler = async (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setCommentInput(event.target.value);

    if (event.target.value.match(/^\s+$/) || event.target.value === "") {
      setSubmitButtonIsActive(false);
      return;
    }
    if (!event.target.value.match(/^\s+$/) && !submitButtonIsActive) {
      setSubmitButtonIsActive(true);
      return;
    }
  };

  const keyDownHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key !== "Enter" ||
      commentInput === "" ||
      commentInput.match(/^\s+$/)
    ) {
      return;
    }

    if (event.key === "Enter" && event.shiftKey) {
      return;
      // new line
    }

    await submit();
  };

  const submit = async () => {
    const newComment: NewComment = {
      date: new Date(),
      postID: placeId,
      text: commentInput,
    };

    await commentContext.uploadNewCommetn(newComment);
    setCommentInput("");
    setSubmitButtonIsActive(false);
  };

  const submitCommentHandler = async () => {
    await submit();
  };

  return (
    <div
      className="border border-primary rounded-4xl w-11/12 h-14 flex flex-row justify-between items-center mb-2"
      onKeyDown={keyDownHandler}
    >
      <div className="w-10/12 pl-4 pt-3 md:w-11/12">
        <textarea
          placeholder="Add a comment"
          className="border-none outline-none resize-none py-1 min-w-full h-8 text-sm"
          value={commentInput}
          onChange={commentInputChangeHandler}
        />
      </div>

      <div>
        {/* <FontAwesomeIcon
          icon={faFaceSmile}
          className={classes["emoji-button"]}
        /> */}

        <div
          onClick={submitCommentHandler}
          className="flex justify-center items-center pr-4"
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            className={
              submitButtonIsActive
                ? "text-primary w-6 h-6 ml-1 cursor-pointer hover:text-primary-hover"
                : "text-white w-6 h-6 ml-1"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CommentInput;

{
  /* <input
        type="text"
        placeholder="Add a comment"
        className={classes["comment-input"]}
        value={commentInput}
        onKeyDown={keyDownHandler}
        onChange={commentInputChangeHandler}
      /> */
}
