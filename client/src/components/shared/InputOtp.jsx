import { Buttonz, InputForm } from '@components/core';
import { usePostApi } from '@lib/react-query';
import { useToastState } from '@store';
import React from 'react';

const InputOtp = (props) => {
  const { isSend, setIsSend, SendOtpApi, username, ...prop } = props;
  const { mutateAsync, isPending } = usePostApi(SendOtpApi);
  const { showToast } = useToastState();

  const onSendOtp = async () => {
    const response = await mutateAsync({ username });
    if (response) {
      showToast({ title: `Đã gửi mã OTP đến email`, severity: 'success' });
      setIsSend(true);
    }
  };

  return (
    <div className="flex items-start justify-center">
      <InputForm label="Mã OTP (*)" {...prop} />
      <Buttonz
        onClick={onSendOtp}
        loading={isPending}
        disabled={!(username) || isSend || isPending}
        className="m-2 px-6 text-center min-w-[100px]"
      >
        Gửi OTP
      </Buttonz>
    </div>
  );
};

export default InputOtp;
