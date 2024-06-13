import { getInfoApi, getListApartmentInfoApi, getListDepartmentInfoApi, getListUserInfoApi } from '@api';
import { Loading } from '@components/shared';
import { useDataState, useUserState } from '@store';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setUsers, setDepartments, setApartments } = useDataState();
  const { setUserInfo, loadingz, project, setProject, isAuthenticated } = useUserState();
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      if (response) {
        const projects = response.projects;
        const checkProject = projects?.find((p) => p._id === project);
        if (!checkProject) setProject(projects[0]?._id);
        setUserInfo(response); 
      } else {
        localStorage.removeItem('token');
        navigate('/auth/signin');
      }
    } catch (error) {
      navigate('/auth/signin');
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
      const apartments = await getListApartmentInfoApi();
      if (apartments) setApartments(apartments);
    } catch (error) {
      navigate('/auth/signin');
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
  }, [loadingz]);

  return <Fragment>{isLoading ? <Loading className="h-8 w-8 border-4" /> : children}</Fragment>;
};

export default AuthProvider;
