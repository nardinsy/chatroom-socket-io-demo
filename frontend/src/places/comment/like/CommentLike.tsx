import { MouseEvent, FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import useRequiredCommentContext from "../../../hooks/use-required-commentContext";
import { CommentDto, CommentLikeDto } from "../../../helpers/dtos";

type CommentLikeT = {
  commentDto: CommentDto;
  loggedUserUserId: string;
};

const CommentLike: FC<CommentLikeT> = ({ commentDto, loggedUserUserId }) => {
  const commentCtx = useRequiredCommentContext();

  const [commentLikeNumber, setCommentLikeNumber] = useState(
    commentDto.likes.length
  );
  const [userLikedComment, setUserLikedComment] = useState(false);

  useEffect(() => {
    const setInitialHeartIconColor = () => {
      if (checkIfUserLikedComment()) {
        setUserLikedComment(true);
      } else {
        setUserLikedComment(false);
      }
    };

    setInitialHeartIconColor();
  }, []);

  const likeCommentClickHandler = async (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();

    if (checkIfUserLikedComment()) {
      await unlikeCommetn();
    } else {
      await likeCommetn();
    }
  };

  const likeCommetn = async () => {
    const newCommentLike: CommentLikeDto = {
      userId: loggedUserUserId,
      commentId: commentDto.id,
      date: new Date(),
    };

    commentDto.likes.unshift({
      userId: loggedUserUserId,
      commentId: commentDto.id,
    });
    await commentCtx.likeComment(commentDto, newCommentLike);

    setUserLikedComment(true);
    setCommentLikeNumber((pre) => pre + 1);
  };

  const unlikeCommetn = async () => {
    commentDto.likes = commentDto.likes.filter(
      (like) => like.userId !== loggedUserUserId
    );

    await commentCtx.unlikeComment(commentDto, loggedUserUserId, commentDto.id);

    setUserLikedComment(false);
    setCommentLikeNumber((pre) => pre - 1);
  };

  const checkIfUserLikedComment = () => {
    return commentDto.likes.find((like) => like.userId === loggedUserUserId);
  };

  const heartIconClassName = userLikedComment ? `text-red-heart` : "";

  return (
    <button className="border-none bg-white">
      <FontAwesomeIcon
        onClick={likeCommentClickHandler}
        icon={faHeart}
        className={`cursor-pointer text-sm text-gray-fav hover:text-red-heart ${heartIconClassName}`}
      />
      <span className="text-xxs ml-1 text-gray-dark">
        {commentLikeNumber ? commentLikeNumber : ""}
      </span>
    </button>
  );
};

export default CommentLike;
