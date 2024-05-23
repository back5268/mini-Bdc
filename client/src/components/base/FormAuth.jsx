import React from 'react';
import { Navigate } from 'react-router-dom';
import { Logo } from '.';
import { Cardz } from '@components/core';
import { useUserState } from '@store';

const FormAuth = (props) => {
  const { title, children } = props;
  const { isAuthenticated } = useUserState();

  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <div className="relative min-h-screen flex justify-center">
      {/* <div
        className="absolute bg-cover top-0 left-0 bottom-0 right-0 -z-10 opacity-50"
        style={{ backgroundImage: `url('/images/background.jpg')` }}
      >
        <span className="absolute top-0 left-0 w-full h-full bg-primary opacity-50"></span>
      </div> */}
      <div className="relative flex justify-center items-center">
        <Cardz className="w-[420px] py-4">
          <div className="text-center">
            <Logo className="m-4" />
            <p className="mb-8 text-md">{title}</p>
          </div>
          <div className="p-4">{children}</div>
        </Cardz>
      </div>
    </div>
  );
};

export default FormAuth;
