import { useForm } from 'react-hook-form';
import { FormAuth } from '@components/base';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostApi } from '@lib/react-query';
import { SigninValidation } from '@lib/validation';
import { useToastState, useUserState } from '@store';
import { signinApi } from '@api';
import { Buttonz, CheckBoxz, InputForm, Linkz } from '@components/core';
import { InputPassword } from '@components/shared';

const SignIn = () => {
  const { showToast } = useToastState();
  const { setLoadingz } = useUserState();
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
      setTimeout(() => {
        showToast({ title: 'Đăng nhập thành công', severity: 'success' });
      }, 1000)
      localStorage.setItem('token', response);
      setLoadingz()
    }
  };

  return (
    <FormAuth title="Vui lòng đăng nhập để tiếp tục">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <InputForm id="username" label="Tài khoản (*)" register={register} errors={errors} className="!w-full" />
        <InputPassword id="password" label="Mật khẩu (*)" register={register} errors={errors} className="!w-full" />
        <div className="flex flex-col gap-2 px-2 mb-4">
          <div className="flex items-center justify-center my-2">
            {/* <CheckBoxz id="remember" label="Nhớ mật khẩu" /> */}
            <Linkz to="/auth/forgot-password" label="Quên mật khẩu?" className="text-sm" />
          </div>
          <Buttonz type="submit" loading={isPending} label="Đăng nhập" />
        </div>
      </form>
    </FormAuth>
  );
};

export default SignIn;
