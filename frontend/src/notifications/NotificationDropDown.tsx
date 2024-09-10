import { FC, useRef } from "react";
import useRequiredNotificationContext from "../hooks/use-required-notificationContext";
import NotificationItem from "./NotificationItem";
import { NotificationDto } from "../helpers/dtos";
import useRequiredAuthContext from "../hooks/use-required-authContext";
import { Link } from "react-router-dom";

interface NotificationDropdownT {}

const NotificationDropdown: FC<NotificationDropdownT> = ({}) => {
  const notifCtx = useRequiredNotificationContext();
  const authCtx = useRequiredAuthContext();

  if (!authCtx.isLoggedin) {
    throw new Error("");
  }

  const ref = useRef<HTMLDivElement | null>(null);

  const generateNotificationsItem = (
    notifications: NotificationDto[] | undefined,
    status: "OLD" | "NEW"
  ) => {
    if (!notifications) return <></>;

    return notifications.map((notification: NotificationDto, index: number) => {
      return (
        <Link
          to={{
            pathname: `/place/${notification.commentContent.placeId}`,
          }}
          key={index}
        >
          <li
            key={index}
            className="cursor-context-menu flex flex-row items-center px-1 py-2 rounded-xl mb-1 hover:bg-[#E9E9E9] transition-colors ease-in duration-[0.1s]"
          >
            {status === "NEW" && (
              <span className={`w-2 h-2 mr-2 rounded bg-[#7CB9E8] `} />
            )}
            <NotificationItem notificationDto={notification} />
          </li>
        </Link>
      );
    });
  };

  const oldNotifications = generateNotificationsItem(
    // authCtx.readOldNotificationsFromLocalStorage(),
    notifCtx.currentNotifications,
    "OLD"
  );

  const newNotifications = generateNotificationsItem(
    notifCtx.newNotifications,
    "NEW"
  );

  return (
    <div
      className="absolute top-16 right-3 bg-white w-[21rem] md:w-[25rem] mb-24 shadow-default rounded-xl overflow-hidden animate-slide-down"
      data-testid="drop"
      ref={ref}
    >
      <div className="font-bold px-6 pt-4 tracking-wide">Notifications</div>
      <ul className="my-3 flex flex-col px-2 max-h-72 overflow-x-hidden overflow-y-scroll scroll-my-13">
        {newNotifications}
        {oldNotifications}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
