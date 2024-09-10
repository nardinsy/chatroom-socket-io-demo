import NotificationButton from "../notifications/NotificationButton";
import useRequiredAuthContext from "../hooks/use-required-authContext";
import { NotificationContextProvider } from "../contexts/notification-context";

const HeaderMenuList: MenuListT = [
  ["Users", "home", "/"],
  ["My Places", "image", "/myplace"],
  ["New Place", "image-add", "/new"],
];

export type MenuListT = [title: string, icon: string, path: string][];

const MainHeader = () => {
  const authCtx = useRequiredAuthContext();

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <header className="flex justify-between items-center text-black py-3 px-8 md:px-29 bg-white drop-shadow-md">
        <div className="flex flex-row items-center p-0 m-0">
          {authCtx.isLoggedin && (
            <NotificationContextProvider>
              <NotificationButton />
            </NotificationContextProvider>
          )}
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
