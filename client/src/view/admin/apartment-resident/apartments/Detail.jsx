import { addApartmentApi, detailApartmentApi, updateApartmentApi } from '@api';
import { FormDetail } from '@components/base';
import { DropdownForm, InputForm, TextAreaz } from '@components/core';
import { statusApartment } from '@constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { ApartmentValidation } from '@lib/validation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const defaultValues = {
  name: '',
  code: '',
  area: 0,
  floor: 0,
  description: '',
  status: 0
};

const DetailApartment = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailApartmentApi, { _id }, 'apartment', isUpdate);
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
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    let newData = { ...data };
    if (isUpdate) newData = { ...checkEqualProp(newData, item), _id };
    return newData;
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
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="name" label="Tên căn hộ (*)" errors={errors} register={register} />
        <InputForm id="code" label="Mã căn hộ (*)" errors={errors} register={register} />
        <InputForm id="area" label="Diện tích căn hộ (*)" errors={errors} register={register} />
        <InputForm id="floor" label="Tầng (*)" errors={errors} register={register} />
        <DropdownForm
          options={statusApartment}
          optionLabel="name"
          optionValue="id"
          label="Trạng thái căn hộ (*)"
          errors={errors}
          id="status"
          watch={watch}
          setValue={setValue}
        />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailApartment;
