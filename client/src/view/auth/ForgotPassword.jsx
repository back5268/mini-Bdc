import { FormAuth } from '@components/base';
import { ForgotPasswordValidation } from '@lib/validation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { confirmPasswordApi, sendOtpForgotPasswordApi } from '@api';
import { usePostApi } from '@lib/react-query';
import { useNavigate } from 'react-router-dom';
import { useToastState } from '@store';
import { Buttonz, CheckBoxz, InputForm, Inputz, Linkz } from '@components/core';
import { InputOtp, InputPassword } from '@components/shared';

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const { mutateAsync, isPending } = usePostApi(confirmPasswordApi);
  const [isSend, setIsSend] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(ForgotPasswordValidation)
  });

  const onSubmit = async (data) => {
    const response = await mutateAsync(data);
    if (response) {
      showToast({ title: 'Đổi mật khẩu thành công', severity: 'success' });
      navigate('/auth/signin');
    }
  };

  return (
    <FormAuth title="Quên mật khẩu">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <InputForm id="email" label="Email (*)" type="email" register={register} errors={errors} className="!w-full" />
        <InputForm id="username" label="Tài khoản (*)" register={register} errors={errors} className="!w-full" />
        <InputOtp
          id="otp"
          register={register}
          errors={errors}
          email={watch('email')}
          username={watch('username')}
          isSend={isSend}
          setIsSend={setIsSend}
          SendOtpApi={sendOtpForgotPasswordApi}
          className="!w-full"
        />
        {isSend && <InputPassword id="password" label="Mật khẩu (*)" register={register} errors={errors} className="!w-full" />}
        <div className="flex flex-col gap-2 px-2 mb-4">
          <div className="flex items-center justify-between">
            <CheckBoxz id="remember">
              Đồng ý <Linkz to="" label="điều khoản và dịch vụ" className="underline" />
            </CheckBoxz>
          </div>
          <Buttonz type="submit" loading={isPending} label="Xác nhận" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-border after:mt-0.5 after:flex-1 after:border-t after:border-border">
              <p className="mx-4 mb-0 text-center font-semibold">or</p>
            </div>
            <div className="text-center">
              <Linkz to="/auth/signin">
                <Buttonz variant="text">Quay trở lại đăng nhập</Buttonz>
              </Linkz>
            </div>
          </div>
        </div>
      </form>
    </FormAuth>
  );
};

export default SignIn;
