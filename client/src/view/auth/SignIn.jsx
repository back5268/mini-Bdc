import React from 'react';
import { useForm } from 'react-hook-form';
import { FormAuth } from '@components/base';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostApi } from '@lib/react-query';
import { SigninValidation } from '@lib/validation';
import { useToastState } from '@store';
import { getInfoApi, signinApi } from '@api';
import { useAuthContext } from '@context/AuthContext';
import { Buttonz, CheckBoxz, InputForm, Linkz } from '@components/core';
import { useNavigate } from 'react-router-dom';
import { InputPassword } from '@components/shared';

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const { setUserInfo, setIsAuthenticated } = useAuthContext();
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
        setIsAuthenticated(true);
        showToast({ title: 'Đăng nhập thành công', severity: 'success' });
        navigate(-1);
      }
    }
  };

  return (
    <FormAuth title="Vui lòng đăng nhập để tiếp tục">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <InputForm id="username" label="Tài khoản (*)" register={register} errors={errors} className="!w-full" />
        <InputPassword id="password" label="Mật khẩu (*)" register={register} errors={errors} className="!w-full" />
        <div className="flex flex-col gap-2 px-2 mb-4">
          <div className="flex items-center justify-between">
            <CheckBoxz id="remember" label="Nhớ mật khẩu" />
            <Linkz to="/auth/forgot-password" label="Quên mật khẩu?" className="text-sm" />
          </div>
          <Buttonz type="submit" loading={isPending} label="Đăng nhập" />
          <div className="text-center">
            <p className="mt-2 text-sm">
              Chưa có tài khoản, <Linkz to="/auth/signup" label="Đăng ký" />
            </p>
          </div>
          <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-border after:mt-0.5 after:flex-1 after:border-t after:border-border">
            <p className="mx-4 mb-0 text-center font-semibold">or</p>
          </div>
          <Buttonz>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              Đăng nhập bằng Facebook
            </div>
          </Buttonz>
          <Buttonz variant='outlined' className='mt-2'>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Đăng nhập bằng Google
            </div>
          </Buttonz>
        </div>
      </form>
    </FormAuth>
  );
};

export default SignIn;
