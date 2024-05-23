import React from 'react';
import { useForm } from 'react-hook-form';
import { FormAuth } from '@components/base';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostApi } from '@lib/react-query';
import { SigninValidation } from '@lib/validation';
import { useToastState, useUserState } from '@store';
import { getInfoApi, signinApi } from '@api';
import { Buttonz, CheckBoxz, InputForm, Linkz } from '@components/core';
import { useNavigate } from 'react-router-dom';
import { InputPassword } from '@components/shared';

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const { setUserInfo } = useUserState();
  const { mutateAsync, isPending } = usePostApi(signinApi);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SigninValidation)
  });
  const onSubmit = async (data) => {
    const response = await mutateAsync(data);
    if (response) {
      localStorage.setItem('token', response);
      const res = await getInfoApi();
      if (res) {
        setUserInfo(res);
        showToast({ title: 'Đăng nhập thành công', severity: 'success' });
        navigate(-1);
      }
    }
  };

  return (
    <FormAuth title="Vui lòng đăng nhập để tiếp tục">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <InputForm id="username" label="Tài khoản (*)" register={register} errors={errors} className="!w-full" />
        <InputPassword id="password" label="Mật khẩu (*)" register={register} errors={errors} className="!w-full" />
        <div className="flex flex-col gap-2 px-2 mb-4">
          <div className="flex items-center justify-between">
            <CheckBoxz id="remember" label="Nhớ mật khẩu" />
            <Linkz to="/auth/forgot-password" label="Quên mật khẩu?" className="text-sm" />
          </div>
          <Buttonz type="submit" loading={isPending} label="Đăng nhập" />
        </div>
      </form>
    </FormAuth>
  );
};

export default SignIn;
