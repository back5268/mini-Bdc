import { Hrz, Linkz, Popoverz } from '@components/core';
import React from 'react';
import { BellAlertIcon } from '@heroicons/react/24/outline';

const NotifySection = () => {
  return (
    <Popoverz
      animate={{
        mount: { scale: 1, x: 0, y: 10 },
        unmount: { scale: 0, x: 150, y: -260 }
      }}
      className="p-0"
      header={
        <div className="p-2">
          <BellAlertIcon className="w-6 text-color" />
        </div>
      }
    >
      <div className="flex flex-col justify-center items-center w-[360px] text-color">
        <div className="flex justify-between w-full items-center px-2 mt-2">
          <div className="font-semibold text-lg uppercase">Thông báo</div>
          <Linkz className="font-medium">Đánh dấu đã đọc</Linkz>
        </div>
        <Hrz className="w-full mt-1 border-color" />
        <div className="h-body-sidebar overflow-scroll border-t-1 border-border w-full mt-4">
          <div className="text-center font-medium">Chưa có thông báo nào</div>
        </div>
      </div>
    </Popoverz>
  );
};

export default NotifySection;
