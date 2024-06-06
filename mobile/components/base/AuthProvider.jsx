import { getInfoApi } from "@api";
import { Loaderz } from "@components/core";
import { useAuthState } from "@store";
import { Fragment, useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const { setUserInfo, loadingz } = useAuthState();
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      if (response) setUserInfo(response);
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [loadingz]);

  return (
    <Fragment>
      {isLoading ? <Loaderz className="h-8 w-8 border-4" /> : children}
    </Fragment>
  );
};

export default AuthProvider;
