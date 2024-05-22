import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import { useAuthContext } from '@context/AuthContext';
import { AccessDenied, ErrorPage } from '@view/auth';
import AdminLayout from '@layout';

const Router = () => {
  const { userInfo } = useAuthContext();

  return (
    <Routes>
      {routes.map((route, index) => {
        const DefaultLayout = route.layout ? AdminLayout : Fragment;
        const Page = route.element;
        const checkPermission = route.public ? true : ["admin", "user"].includes(userInfo.type);

        return (
          <Route
            key={index}
            path={route.path}
            element={
              checkPermission ? (
                <DefaultLayout>
                  <Page />
                </DefaultLayout>
              ) : (
                <AccessDenied />
              )
            }
          />
        );
      })}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;
