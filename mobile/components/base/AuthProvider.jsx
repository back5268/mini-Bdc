import { getInfoApi } from "@api";
import { Loaderz } from "@components/core";
import { useAuthState } from "@store";
import { Fragment, useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const { setUserInfo, setApartments, loadingz } = useAuthState();
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response?.data?.userInfo);
        setApartments(response?.data?.apartments);
      }
    } catch (error) {
      return false;
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkAuth();
  }, [loadingz]);

  if (isLoading) return <Loaderz className="h-8 w-8 border-4" />;
  return <Fragment>{children}</Fragment>;
};

export default AuthProvider;
