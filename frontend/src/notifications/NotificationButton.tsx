import { useEffect, useRef, useState } from "react";
import NotificationDropdown from "./NotificationDropDown";
import useRequiredNotificationContext from "../hooks/use-required-notificationContext";

const NotificationButton = () => {
  const notifCtx = useRequiredNotificationContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (!ref.current) return;

      if (showDropdown && !ref.current.contains(e.target)) {
        closeDropDown();
      }
    };

    window.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      window.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showDropdown]);

  const notificationButtonHandler = async (
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.preventDefault();
    showDropdown ? await closeDropDown() : openDropDown();
  };

  const closeDropDown = async () => {
    setShowDropdown(false);
    await notifCtx.mergeAndResetNotifications();
  };

  const openDropDown = () => {
    setShowDropdown(true);
  };

  return (
    <div onClick={notificationButtonHandler} ref={ref}>
      <button
        className={`relative bx bx-bell text-2xl cursor-pointer hover:bg-gray-light border-none rounded-full mx-4 py-1 px-2`}
      >
        {notifCtx.newNotifications.length > 0 ? (
          <span className="absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center bg-red-heart text-white text-[0.6rem]">
            {notifCtx.newNotifications.length}
          </span>
        ) : (
          ""
        )}
      </button>
      {showDropdown && <NotificationDropdown />}
    </div>
  );
};

export default NotificationButton;
