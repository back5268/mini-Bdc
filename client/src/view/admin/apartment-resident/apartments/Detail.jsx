import { addApartmentApi, detailApartmentApi, updateApartmentApi } from '@api';
import { FormDetail } from '@components/base';
import { InputForm, TextAreaz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetApi } from '@lib/react-query';
import { ApartmentValidation } from '@lib/validation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const defaultValues = {
  name: '',
  code: '',
  recipe: 1,
  prices: 0,
  serviceType: '',
  description: ''
};

const DetailApartment = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailApartmentApi, { _id }, 'apartment', isUpdate);
  const [prices, setPrices] = useState([{ key: 1 }]);

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
      //   if (item.recipe === 1) item.prices = Number(item.prices?.[0]?.amount);
      //   else setPrices(item.prices);
      //   for (const key in defaultValues) {
      //     setValue(key, item[key]);
      //   }
    }
  }, [item]);

  const handleData = (data) => {
    let newData = { ...data };
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
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailApartment;
