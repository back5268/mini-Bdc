import { Buttonz, Imagez, Popoverz } from '@components/core';
import { useUserState } from '@store';
import React from 'react';

const AvatarSection = ({ onSignOut }) => {
  const { userInfo } = useUserState();

  return (
    <Popoverz className="p-0" header={<Imagez src={userInfo?.avatar || '/images/avatar.jpg'} alt="Avatar" />}>
      <div className="flex flex-col justify-center items-center w-64">
        <div className="flex gap-4 h-24 items-center w-full">
          <Imagez className="h-20 w-20" src={userInfo?.avatar || '/images/avatar.jpg'} alt="Avatar" />
          <div className="items-center text-left">
            <h4 className="font-medium mb-1">{userInfo?.fullName}</h4>
            <p className="text-sm">@{userInfo?.username}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 my-4 w-full">
          <Buttonz onClick={onSignOut} variant="outlined" className="w-full">
            Đăng xuất
          </Buttonz>
        </div>
      </div>
    </Popoverz>
  );
};

export default AvatarSection;
