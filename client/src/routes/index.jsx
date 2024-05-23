import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import { AccessDenied, ErrorPage } from '@view/auth';
import AdminLayout from '@layout';
import { useUserState } from '@store';

const Router = () => {
  const { userInfo } = useUserState();

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
