import { addRequestApi, detailRequestApi, getListRequestApi, updateRequestApi } from '@api';
import { FormDetail } from '@components/base';
import { InputForm, MultiSelectForm, TextAreaz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { RequestValidation } from '@lib/validation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const defaultValues = {
  name: '',
  apartments: [],
  description: ''
};

const DetailRequest = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailRequestApi, { _id }, 'requests', isUpdate);
  const { isLoading, data } = useGetApi(getListRequestApi, null, 'requests');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(RequestValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      //   if (item.recipe === 1) item.prices = Number(item.prices?.[0]?.amount);
      //   else setPrices(item.prices);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    let newData = { ...data };
    if (!newData.name) return 'Vui lòng nhập tên yêu cầu!';
    if (isUpdate) newData = { ...checkEqualProp(newData, item), _id };
    return newData;
  };
  return (
    <FormDetail
      type="nomal"
      title="yêu cầu"
      isUpdate={isUpdate}
      createApi={addRequestApi}
      updateApi={updateRequestApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="name" label="Tên yêu cầu (*)" errors={errors} register={register} />
        <InputForm id="code" label="Mã yêu cầu (*)" errors={errors} register={register} />
        <MultiSelectForm
          options={data?.documents}
          optionLabel="name"
          optionValue="_id"
          id="apartments"
          watch={watch}
          label="Trạng thái xử lí (*)"
          setValue={setValue}
          errors={errors}
        />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailRequest;
