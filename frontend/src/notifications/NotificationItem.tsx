import { CommentAction, NotificationDto, UserDto } from "../helpers/dtos";
import Avatar from "../shared-UI/Avatar";
import { createAbsoluteApiAddress } from "../helpers/api-url";

const NotificationItem = ({
  notificationDto,
}: {
  notificationDto: NotificationDto;
}) => {
  const absolutePictuteUrl = notificationDto.from.pictureUrl
    ? createAbsoluteApiAddress(notificationDto.from.pictureUrl)
    : undefined;

  const { from }: { from: UserDto } = notificationDto;

  // const userDto: UserDto = { ...from, pictureUrl: absolutePictuteUrl };
  // const placeDto: PlaceDto = {}
  let message;

  if (notificationDto.kind === "Comment") {
    message = getCommentNotificationMessage(notificationDto);
  } else if (notificationDto.kind === "Follow") {
    message = getFollowNotificationMessage(notificationDto);
  }

  return (
    <div className="flex flex-row items-center w-full">
      <Avatar
        pictureUrl={absolutePictuteUrl}
        alt={"user"}
        width={"2rem"}
        cssClassName="mr-1"
      />
      <div className="text-gray-fav tracking-wide text-sm">
        {/* <Link
          to={{
            pathname: `/places/${from.userId}`,
            state: { userDto },
          }}
        > */}
        <span className="font-bold text-gray-dark ">{from.username}</span>
        <span> </span>
        {/* </Link> */}

        {message}
      </div>
    </div>
  );
};

const getCommentNotificationMessage = (
  notificationDto: NotificationDto
): string => {
  const { commentContent } = notificationDto;

  let message: string = "Notification";

  switch (+commentContent.action) {
    case CommentAction.LikeComment:
      message = `liked your comment`;
      break;
    case CommentAction.ReplyComment:
      message = `replied to your comment`;
      break;
    case CommentAction.UnlikeComment:
      message = `unliked to your comment`;
      break;
    case CommentAction.WriteComment:
      message = `commented on your post`;
      break;
  }

  return message;
};

const getFollowNotificationMessage = (
  notificationDto: NotificationDto
): string => {
  return `wants to follow you`;
};

export default NotificationItem;
