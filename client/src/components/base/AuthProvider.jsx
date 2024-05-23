import { getInfoApi, getListDepartmentInfoApi, getListUserInfoApi } from '@api';
import { Loading } from '@components/shared';
import { useDataState, useUserState } from '@store';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setUsers, setDepartments } = useDataState();
  const { setUserInfo } = useUserState();
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else localStorage.removeItem('token');
    } catch (error) {
      return false;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const getData = async () => {
    try {
      const users = await getListUserInfoApi();
      if (users) setUsers(users);
      const departements = await getListDepartmentInfoApi();
      if (departements) setDepartments(departements);
    } catch (error) {
      return false;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth();
      getData();
    } else {
      setIsLoading(false);
      navigate('/auth/signin');
    }
  }, []);

  return <Fragment>{isLoading ? <Loading className="h-8 w-8 border-4" /> : children}</Fragment>;
};

export default AuthProvider;
