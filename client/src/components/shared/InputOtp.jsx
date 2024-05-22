import { Buttonz, InputForm } from '@components/core';
import { REGEX } from '@constant';
import { usePostApi } from '@lib/react-query';
import { useToastState } from '@store';
import React from 'react';

const InputOtp = (props) => {
  const { isSend, setIsSend, SendOtpApi, email, username, ...prop } = props;
  const { mutateAsync, isPending } = usePostApi(SendOtpApi);
  const { showToast } = useToastState();

  const onSendOtp = async () => {
    const response = await mutateAsync({ email, username });
    if (response) {
      showToast({ title: `Đã gửi mã OTP đến email ${email}`, severity: 'success' });
      setIsSend(true);
    }
  };

  return (
    <div className="flex items-start justify-center">
      <InputForm label="Mã OTP (*)" {...prop} />
      <Buttonz
        onClick={onSendOtp}
        loading={isPending}
        disabled={!(username && REGEX.C_EMAIL.test(email)) || isSend || isPending}
        className="m-2 px-6 text-center min-w-[100px]"
      >
        Gửi OTP
      </Buttonz>
    </div>
  );
};

export default InputOtp;
