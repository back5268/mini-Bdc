import { addApartmentGroupApi, detailApartmentGroupApi, updateApartmentGroupApi } from '@api';
import { FormDetail } from '@components/base';
import { DropdownForm, InputForm, TextAreaz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetApi } from '@lib/react-query';
import { PriceValidation } from '@lib/validation';
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

const DetailApartmentGroup = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailApartmentGroupApi, { _id }, 'apartment-group', isUpdate);
  const [prices, setPrices] = useState([{ key: 1 }]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(PriceValidation),
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
    // let newData = { ...data };
    // if (Number(newData.recipe) === 1) {
    //   if (!newData.prices) return 'Vui lòng nhập giá tiền';
    //   else newData.prices = [{ from: 0, to: 0, amount: newData.prices }];
    // } else newData.prices = prices.map((p) => ({ ...p, key: undefined }));
    // if (isUpdate) newData = { ...checkEqualProp(newData, item), _id };
    // return newData;
  };

  return (
    <FormDetail
      type="nomal"
      title="nhóm căn hộ"
      isUpdate={isUpdate}
      createApi={addApartmentGroupApi}
      updateApi={updateApartmentGroupApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="name" label="Tên nhóm căn hộ (*)" errors={errors} register={register} />
        <DropdownForm id="recipe" label="Căn hộ (*)" errors={errors} watch={watch} setValue={setValue} />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailApartmentGroup;
