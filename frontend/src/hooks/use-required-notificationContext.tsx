import { useContext } from "react";
import NotificationContext from "../contexts/notification-context";

const useRequiredNotificationContext = () => {
  const notificationCtx = useContext(NotificationContext);

  if (!notificationCtx) {
    throw new Error(
      "useNotificationContext has to be used within <NotificationContext.Provider>"
    );
  }

  return notificationCtx;
};

export default useRequiredNotificationContext;
