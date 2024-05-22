import { Buttonz, Imagez, Popoverz } from '@components/core';
import { useAuthContext } from '@context/AuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AvatarSection = ({ mode = 'admin', onSignOut }) => {
  const navigate = useNavigate();
  const { userInfo } = useAuthContext();
  const isAdminLayout = mode === 'admin';
  const isUser = ['admin', 'user'].includes(userInfo.type);

  return (
    <Popoverz className="p-0" header={<Imagez src={userInfo?.avatar || '/images/avatar.jpg'} alt="Avatar" />}>
      <div className="flex flex-col justify-center items-center w-64">
        <div className="flex gap-4 h-24 items-center w-full">
          <Imagez className="h-20 w-20" src={userInfo?.avatar || '/images/avatar.jpg'} alt="Avatar" />
          <div className="items-center text-left">
            <h4 className="font-medium mb-1">{userInfo?.name}</h4>
            <p className="text-sm">@{userInfo?.username}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 my-4 w-full">
          {isUser && (
            <Buttonz className="w-full" onClick={() => navigate(isAdminLayout ? '/' : '/admin')}>
              {isAdminLayout ? 'Chuyển đến trang chủ' : 'Chuyển đến trang admin'}
            </Buttonz>
          )}
          <Buttonz onClick={onSignOut} variant="outlined" className="w-full">
            Đăng xuất
          </Buttonz>
        </div>
      </div>
    </Popoverz>
  );
};

export default AvatarSection;
