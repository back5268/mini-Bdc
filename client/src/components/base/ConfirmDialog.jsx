import React from 'react';
import { useConfirmState } from '@store';
import { Buttonz, Dialogz, Hrz } from '@components/core';

const ConfirmDialog = () => {
  const { confirmInfo = {}, open, hideConfirm } = useConfirmState();

  return (
    <Dialogz title="Mini BDC" open={open} setOpen={hideConfirm} className="w-[500px]" z={60}>
      <div className="p-6 text-left">{confirmInfo.title || 'Bạn có chắc chắn muốn tiếp tục?'}</div>
      <Hrz/>
      <div className="flex gap-4 justify-end mt-4">
        <Buttonz label="Hủy" color="red" onClick={() => hideConfirm()} />
        <Buttonz
          label="Xác nhận"
          onClick={async () => {
            await confirmInfo?.action();
            hideConfirm();
          }}
        />
      </div>
    </Dialogz>
  );
};

export default ConfirmDialog;
