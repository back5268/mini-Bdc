import { ProjectValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addProjectApi, detailProjectApi, getInfoApi, updateProjectApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { InputForm, TextAreaz } from '@components/core';
import { useParams } from 'react-router-dom';
import { useGetApi } from '@lib/react-query';
import { UploadFiles, UploadImage } from '@components/shared';
import { useUserState } from '@store';

const defaultValues = {
  name: '',
  code: '',
  email: '',
  phone: '',
  address: '',
  description: ''
};

const DetailProject = () => {
  const { _id } = useParams();
  const { setUserInfo } = useUserState();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailProjectApi, { _id }, 'project', isUpdate);
  const [avatar, setAvatar] = useState(null);
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(ProjectValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      if (item.avatar) setAvatar(item.avatar);
      if (item.images) setImages(item.images);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    let newData = { ...data };
    if (isUpdate) newData = { ...checkEqualProp(newData, item), _id };
    if (images?.length > 0) {
      if (JSON.stringify(images) !== JSON.stringify(item?.images)) {
        const newImages = [];
        const formData = [];
        images.forEach((f) => {
          if (item?.images.some((i) => JSON.stringify(i) === JSON.stringify(f))) newImages.push(f);
          else formData.push(f);
        });
        if (newImages.length > 0) newData.images = newImages;
        if (formData.length > 0) newData.formData = { images: formData };
      }
    } else if (item?.images?.length > 0) newData.images = [];
    if (avatar && avatar !== item?.avatar) {
      if (newData.formData) newData.formData = { ...newData.formData, avatar };
      else newData.formData = { avatar };
    }
    return newData;
  };

  const onSuccess = async () => {
    const response = await getInfoApi();
    if (response) {
      setUserInfo(response);
    } else localStorage.removeItem('token');
  };

  return (
    <FormDetail
      type="nomal"
      title="dự án"
      isUpdate={isUpdate}
      createApi={addProjectApi}
      updateApi={updateProjectApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="name" label="Tên dự án (*)" errors={errors} register={register} />
        <InputForm id="code" label="Mã dự án (*)" errors={errors} register={register} />
        <InputForm id="email" label="Email (*)" errors={errors} register={register} />
        <InputForm id="phone" label="Số điện thoại (*)" errors={errors} register={register} />
        <InputForm id="address" label="Địa chỉ (*)" errors={errors} register={register} />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-4/12">
            <UploadImage label="Ảnh đại diện" data={avatar} setData={setAvatar} className="lg:mr-6" />
          </div>
          <div className="w-full lg:w-8/12">
            <UploadFiles label="Hình ảnh mô tả" type="image" files={images} setFiles={setImages} />
          </div>
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailProject;
