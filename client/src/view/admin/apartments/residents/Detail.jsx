import { addResidentApi, getInfoApi, getListUserInfoApi, updateResidentApi } from '@api';
import { FormDetail } from '@components/base';
import { InputCalendarForm, InputForm, TextAreaz } from '@components/core';
import { MultiRadio, UploadImage } from '@components/shared';
import { genders } from '@constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp, databseDate } from '@lib/helper';
import { ResidentValidation } from '@lib/validation';
import { useDataState, useUserState } from '@store';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = {
  fullName: '',
  code: '',
  username: '',
  email: '',
  bio: '',
  gender: 1,
  address: '',
  phone: ''
};

const DetailResident = (props) => {
  const { userInfo, setUserInfo } = useUserState();
  const { open, setOpen, setParams, data } = props;
  const [avatar, setAvatar] = useState(null);
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};
  const { departments, setUsers } = useDataState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(ResidentValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      if (item.avatar) setAvatar(item.avatar);
      if (item.birthday) setValue('birthday', new Date(item.birthday));
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data, type: 'resident' };
    if (avatar) newData.formData = { avatar };
    else if (item.avatar) newData.avatar = '';
    if (newData.birthday && newData.birthday !== new Date(item?.birthday)) newData.birthday = databseDate(newData.birthday);
    else newData.birthday = undefined;
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  const onSuccess = async () => {
    const users = await getListUserInfoApi();
    if (users) setUsers(users);
    if (open === userInfo._id) {
      const response = await getInfoApi();
      if (response) {
        setUserInfo(response);
      } else localStorage.removeItem('token');
    }
  };

  return (
    <FormDetail
      title="cư dân"
      open={open}
      setOpen={() => {
        setOpen(false);
        setAvatar(null);
        reset();
      }}
      isUpdate={isUpdate}
      createApi={addResidentApi}
      updateApi={updateResidentApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
      onSuccess={onSuccess}
    >
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-4/12">
          <UploadImage label="Ảnh đại diện" data={avatar} setData={setAvatar} />
        </div>
        <div className="w-full lg:w-8/12">
          <div className="flex flex-wrap">
            <InputForm id="fullName" label="Họ và tên cư dân (*)" errors={errors} register={register} />
            <InputForm id="code" label="Mã cư dân (*)" errors={errors} register={register} />
            <InputForm id="email" label="Email (*)" errors={errors} register={register} />
            <InputForm id="phone" label="Số điện thoại (*)" errors={errors} register={register} />
            <InputForm id="username" label="Tài khoản (*)" errors={errors} register={register} />
            <InputForm id="address" label="Địa chỉ" errors={errors} register={register} />
            <InputCalendarForm id="birthday" label="Ngày sinh" errors={errors} setValue={setValue} watch={watch} />
            <MultiRadio
              id="gender"
              label="Giới tính:"
              options={genders}
              value={watch('gender')}
              setValue={(e) => setValue('gender', e)}
              className="w-full lg:w-8/12"
            />
            <TextAreaz id="bio" label="Mô tả" value={watch('bio')} setValue={(e) => setValue('bio', e)} />
          </div>
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailResident;
