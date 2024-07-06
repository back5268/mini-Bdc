import { addResidentApi, detailResidentApi, getListResidentInfoApi, updateResidentApi } from '@api';
import { FormDetail } from '@components/base';
import { DropdownForm, Hrz, InputCalendarForm, InputForm, TextAreaz } from '@components/core';
import { MultiRadio, UploadImage } from '@components/shared';
import { genders, residentType } from '@constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp, databseDate } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { ResidentValidation } from '@lib/validation';
import { useDataState } from '@store';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const defaultValues = {
  apartment: '',
  fullName: '',
  email: '',
  bio: '',
  gender: 1,
  phone: '',
  type: ''
};

const DetailResident = () => {
  const { _id } = useParams();
  const [avatar, setAvatar] = useState(null);
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailResidentApi, { _id }, 'resident', isUpdate);
  const { setResidents, apartments } = useDataState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(ResidentValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      if (item.avatar) setAvatar(item.avatar);
      if (item.apartment) {
        item.type = item.apartment.type;
        item.apartment = item.apartment._id;
      }
      if (item.birthday) setValue('birthday', new Date(item.birthday));
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data, apartment: undefined, type: undefined };
    if (avatar) newData.formData = { avatar };
    else if (item?.avatar) newData.avatar = '';
    if (newData.birthday && new Date(newData.birthday) > new Date()) return "Ngày sinh không được lớn hơn ngày hiện tại"
    if (newData.birthday && newData.birthday !== new Date(item?.birthday)) newData.birthday = databseDate(newData.birthday);
    else newData.birthday = undefined;
    newData.apartment = { _id: data.apartment, type: Number(data.type) };
    if (isUpdate) return { ...checkEqualProp(newData, item), _id };
    else return newData;
  };

  const onSuccess = async () => {
    const residents = await getListResidentInfoApi();
    if (residents) setResidents(residents);
  };

  return (
    <FormDetail
      type="nomal"
      title="cư dân"
      isUpdate={isUpdate}
      createApi={addResidentApi}
      updateApi={updateResidentApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
    >
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-4/12">
          <UploadImage label="Ảnh đại diện" data={avatar} setData={setAvatar} />
        </div>
        <div className="w-full lg:w-8/12">
          <div className="flex flex-wrap">
            <InputForm id="fullName" label="Họ và tên cư dân (*)" errors={errors} register={register} />
            <InputForm id="email" label="Email (*)" errors={errors} register={register} />
            <InputForm id="phone" label="Số điện thoại (*)" errors={errors} register={register} />
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
          <div className="w-full mt-4">
            <label className="inline-block font-medium text-left ml-2">Căn hộ</label>
            <Hrz />
            <div className="w-full flex flex-wrap mt-4">
              <DropdownForm
                options={apartments}
                optionLabel="name"
                optionValue="_id"
                label="Căn hộ (*)"
                errors={errors}
                id="apartment"
                watch={watch}
                setValue={setValue}
              />
              <DropdownForm
                options={residentType}
                label="Quan hệ với chủ hộ (*)"
                errors={errors}
                id="type"
                watch={watch}
                setValue={setValue}
              />
            </div>
          </div>
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailResident;
