import { useContext } from "react";
import AuthContext from "../contexts/auth-context";

const useRequiredAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "useAuthContext has to be used within <AuthContext.Provider>"
    );
  }

  return authContext;
};

export default useRequiredAuthContext;
