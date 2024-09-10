import { useContext } from "react";
import { BackendService } from "../api/backend-service";
import BackendContext from "../contexts/backend-service-context";

const useRequiredBackend: () => BackendService = () => {
  const backendContext = useContext(BackendContext);

  if (!backendContext) {
    throw new Error(
      "useRequiredBackend has to be used within <BackendContext.Provider>"
    );
  }

  return backendContext;
};

export default useRequiredBackend;
