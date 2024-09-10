import { FC, ReactNode, useRef, MouseEvent, useState, useEffect } from "react";
import Avatar from "../../shared-UI/Avatar";
import { CommentDto, UserDto } from "../../helpers/dtos";
import { createAbsoluteApiAddress } from "../../helpers/api-url";
import { Link } from "react-router-dom";
import Dropdown, { DropDownItem } from "../../shared/DropdownCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import CommentLike from "./like/CommentLike";
import useRequiredAuthContext from "../../hooks/use-required-authContext";
import Reply from "./reply/Reply";

type CommentItemT = {
  commentDto: CommentDto;
  children?: ReactNode | ReactNode[];
  items?: DropDownItem[];
};

const CommentItem: FC<CommentItemT> = ({ commentDto, children, items }) => {
  const authCtx = useRequiredAuthContext();
  const [showDropDown, setShowDropDown] = useState(false);
  const [replyMode, setReplyMode] = useState(false);

  const moreButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (!moreButtonRef.current) return;

      if (showDropDown && !moreButtonRef.current.contains(e.target)) {
        setShowDropDown(false);
        // closeDropdown(e);
      }
    };

    window.addEventListener("mousedown", checkIfClickedOutside);
    window.addEventListener("scroll", (event) => setShowDropDown(false));

    return () => {
      window.removeEventListener("mousedown", checkIfClickedOutside);
      window.addEventListener("scroll", (event) => setShowDropDown(false));
    };
  }, [showDropDown]);

  // const { date, postID, text, writer, likes, replies, id } = commentDto;
  const { pictureUrl, userId, username, placeCount } = commentDto.writer;
  const absolutePictureUrl = pictureUrl
    ? createAbsoluteApiAddress(pictureUrl)
    : undefined;

  const userDto: UserDto = {
    pictureUrl: absolutePictureUrl,
    userId,
    username,
    placeCount,
  };

  const moreButtonClickHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShowDropDown((pre) => !pre);
  };

  const replyButtonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setReplyMode((pre) => !pre);
  };

  const disableReplyMode = () => {
    setReplyMode(false);
  };

  const defaultItems = [
    { title: "Help", handler: () => {} },
    // {
    //   title: "Repost this content",
    //   handler: () => {},
    // },
  ];

  const dropdownItems = items ? [...defaultItems, ...items] : defaultItems;

  return (
    <>
      <div className="flex flex-row pb-2">
        <div className="w-12 h-12 flex justify-center items-center">
          <Link
            to={{
              pathname: `/places/${userId}`,
              state: { userDto },
            }}
          >
            <Avatar
              alt="comment"
              pictureUrl={absolutePictureUrl}
              key={userId}
              width="2rem"
            />
          </Link>
        </div>

        <div className="w-full">
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center">
              <Link
                to={{ pathname: `/places/${userId}`, state: { userDto } }}
                className="text-xs text-black-light tracking-wider pr-4 hover:text-black"
              >
                @{username}
              </Link>
            </div>
            {authCtx.isLoggedin && (
              <div className="flex flex-row items-center justify-center">
                <button
                  className="text-gray-fav bg-white border-none text-xs tracking-wider pr-2 hover:text-black-light"
                  onClick={replyButtonClickHandler}
                >
                  Reply
                </button>
                <CommentLike
                  commentDto={commentDto}
                  loggedUserUserId={authCtx.userId}
                />
              </div>
            )}
            <button
              data-testid="more-button"
              ref={moreButtonRef}
              className="relative px-2 border-none text-gray-fav hover:text-black-light"
              onClick={moreButtonClickHandler}
            >
              <FontAwesomeIcon icon={faEllipsis} />
              {showDropDown && (
                <Dropdown
                  items={dropdownItems}
                  key={Math.random()}
                  propClassName="absolute -top-8 left-8 z-20 bg-white rounded-xl shadow-default "
                />
              )}
            </button>
          </div>
          {children}
        </div>
      </div>

      <Reply
        commentDto={commentDto}
        showReplyTextarea={replyMode}
        closeReplyTextarea={disableReplyMode}
      />
    </>
  );
};

export default CommentItem;
