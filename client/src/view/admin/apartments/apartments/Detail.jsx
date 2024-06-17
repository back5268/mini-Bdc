import { addApartmentApi, detailApartmentApi, getListApartmentInfoApi, updateApartmentApi } from '@api';
import { FormDetail } from '@components/base';
import { DropdownForm, InputForm, TextAreaz } from '@components/core';
import { UploadFiles } from '@components/shared';
import { apartmentStatus } from '@constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { ApartmentValidation } from '@lib/validation';
import { useDataState } from '@store';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const defaultValues = {
  name: '',
  code: '',
  area: 0,
  floor: 0,
  description: '',
  status: 1,
  numberResident: 0,
  numberVehicle: 0
};

const DetailApartment = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailApartmentApi, { _id }, 'apartment', isUpdate);
  const [images, setImages] = useState([]);
  const { setApartments } = useDataState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(ApartmentValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
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
    return { ...newData, numberResident: undefined, numberVehicle: undefined };
  };

  const onSuccess = async () => {
    const apartments = await getListApartmentInfoApi();
    if (apartments) setApartments(apartments);
  };

  return (
    <FormDetail
      type="nomal"
      title="căn hộ"
      isUpdate={isUpdate}
      createApi={addApartmentApi}
      updateApi={updateApartmentApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="name" label="Tên căn hộ (*)" errors={errors} register={register} />
        <InputForm id="code" label="Mã căn hộ (*)" errors={errors} register={register} />
        <InputForm id="area" label="Diện tích căn hộ (m2) (*)" errors={errors} register={register} />
        <InputForm id="floor" label="Tầng (*)" errors={errors} register={register} />
        {isUpdate && (
          <>
            <InputForm id="numberResident" label="Số người" register={register} />
            <InputForm id="numberVehicle" label="Số phương tiện" register={register} />
          </>
        )}
        <DropdownForm
          options={apartmentStatus}
          label="Trạng thái căn hộ (*)"
          errors={errors}
          id="status"
          watch={watch}
          setValue={setValue}
        />

        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
        <UploadFiles label="Hình ảnh căn hộ" type="image" files={images} setFiles={setImages} />
      </div>
    </FormDetail>
  );
};

export default DetailApartment;
