import { createContext, useState, useEffect, FC } from "react";
import { useHistory } from "react-router-dom";
import {
  UserLoginInformation,
  UserSignupInformation,
} from "../../../backend/src/shared/dtos";
import { HasChildren } from "../helpers/props";
import useRequiredBackend from "../hooks/use-required-backend";

interface LoggedOutAuthContextT {
  isLoggedin: false;
  signup: (userinfo: UserSignupInformation) => Promise<void>;
  login: (userinfo: UserLoginInformation) => Promise<void>;
}

interface LoggedInAuthContextT {
  isLoggedin: true;
  token: string;
  username: string;
  userId: string;
}

type LoginInfo =
  | {
      isLoggedin: true;
      token: string;
      username: string;
      userId: string;
    }
  | { isLoggedin: false };

export type AuthContextT = LoggedInAuthContextT | LoggedOutAuthContextT;

const AuthContext = createContext<AuthContextT | undefined>(undefined);

const saveUserInfoToLocalStorage = (
  token: string,
  userId: string,
  username: string
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  localStorage.setItem("username", username);
};

export const AuthContextProvider: FC<HasChildren> = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({ isLoggedin: false });

  const history = useHistory();
  const backend = useRequiredBackend();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      return;
    }
    const storedUserId = localStorage.getItem("userId")!;
    const storedUsername = localStorage.getItem("username")!;

    localLogin(storedToken, storedUserId, storedUsername);
  }, []);

  const signup = async (userInfo: UserSignupInformation) => {
    const data = await backend.signup(userInfo);
    const { token, user } = data;

    localLogin(token, user.userId, user.username);

    history.replace("/");
  };

  const login = async (userInfo: UserLoginInformation) => {
    const data = await backend.login(userInfo);
    const { token, user } = data;
    localLogin(token, user.userId, user.username);
    history.replace("/");
  };

  const localLogin = (token: string, userId: string, username: string) => {
    setLoginInfo({
      isLoggedin: true,
      token,
      userId,
      username,
    });
    saveUserInfoToLocalStorage(token, userId, username);
  };

  const value: AuthContextT = loginInfo.isLoggedin
    ? {
        isLoggedin: true,
        token: loginInfo.token,
        username: loginInfo.username,
        userId: loginInfo.userId,
      }
    : { isLoggedin: false, signup, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
