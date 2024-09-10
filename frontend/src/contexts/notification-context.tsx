import { createContext, useState, useEffect, FC, useCallback } from "react";
import { WithChildren } from "../helpers/props";
import useRequiredBackend from "../hooks/use-required-backend";
import { NotificationDto } from "../helpers/dtos";
import useRequiredAuthContext from "../hooks/use-required-authContext";
import { createWebSocket } from "../services/webSocket";

interface NotificationContextT {
  newNotifications: NotificationDto[];
  currentNotifications: NotificationDto[];
  mergeAndResetNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextT | undefined>(
  undefined
);

const socket = createWebSocket();

export const NotificationContextProvider: FC<WithChildren<{}>> = ({
  children,
}) => {
  const backend = useRequiredBackend();
  const authCtx = useRequiredAuthContext();

  if (!authCtx.isLoggedin) {
    throw new Error("");
  }

  const [currentNotifications, setCurrentNotifications] = useState<
    NotificationDto[]
  >([]);

  const [newNotifications, setNewNotifications] = useState<NotificationDto[]>(
    []
  );

  const fetchAndSetCurrentNotifications = useCallback(async () => {
    console.log("This should call only one time");
    const { currentNotifications } = await backend.getCurrentNotifications(
      authCtx.token
    );
    setCurrentNotifications(currentNotifications);
  }, [authCtx.token, backend]);

  useEffect(() => {
    fetchAndSetCurrentNotifications();
  }, [fetchAndSetCurrentNotifications]);

  useEffect(() => {
    const connectSocket = async () => {
      const isConnected = await socket.connect(authCtx.token);
      if (!isConnected) {
        console.log("Offline");
        return;
      }

      socket.listenToCommentNotifications((newNotification) => {
        setNewNotifications((pre) => [newNotification, ...pre]);
      });
    };

    connectSocket();

    return () => {
      socket.close();
    };
  }, [authCtx.token]);

  const mergeAndResetNotifications = async () => {
    setCurrentNotifications((pre) => [...newNotifications, ...pre]);
    setNewNotifications([]);

    await backend.mergeAndResetNotifications(authCtx.token);
  };

  const value: NotificationContextT = {
    newNotifications,
    currentNotifications,
    mergeAndResetNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
