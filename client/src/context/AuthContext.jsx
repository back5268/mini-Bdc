import { getInfoApi, getListProductInfoApi, getListUserInfoApi } from '@api';
import { Loading } from '@components/shared';
import { useDataState } from '@store';
import { createContext, useContext, useEffect, useState } from 'react';

export const INITIAL_USER_INFO = {
  _id: '',
  username: '',
  name: '',
  email: '',
  bio: '',
  address: '',
  type: '',
  avatar: '/images/avatar.jpg',
  notifies: []
};

const INITIAL_STATE = {
  userInfo: INITIAL_USER_INFO,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false
};

const AuthContext = createContext(INITIAL_STATE);

export function AuthProvider({ children }) {
  const { setUsers, setProducts } = useDataState()
  const [userInfo, setUserInfo] = useState(INITIAL_USER_INFO);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
        setIsAuthenticated(true);
      } else localStorage.removeItem('token');
    } catch (error) {
      return false;
    }
  };

  const getData = async () => {
    try {
      const users = await getListUserInfoApi();
      if (users) setUsers(users);
      const products = await getListProductInfoApi();
      if (products) setProducts(products);
    } catch (error) {
      return false;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) checkAuth();
    getData();
  }, []);

  const value = {
    userInfo,
    setUserInfo,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{isLoading ? <Loading /> : children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
