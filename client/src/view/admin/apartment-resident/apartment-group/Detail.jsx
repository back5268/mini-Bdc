import { addApartmentGroupApi, detailApartmentGroupApi, getListApartmentApi, updateApartmentGroupApi } from '@api';
import { FormDetail } from '@components/base';
import { InputForm, MultiSelectz, TextAreaz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { ApartmentGroupValidation } from '@lib/validation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const defaultValues = {
  name: '',
  apartments: [],
  description: ''
};

const DetailApartmentGroup = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailApartmentGroupApi, { _id }, 'apartment-group', isUpdate);
  const { isLoading, data } = useGetApi(getListApartmentApi, null, 'apartments');
  const [apartments, setApartments] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(ApartmentGroupValidation),
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
    if (!newData.name) return 'Vui lòng nhập tên nhóm căn hộ!';
    if (isUpdate) newData = { ...checkEqualProp(newData, item), _id };
    return newData;
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
        <MultiSelectz
          options={data?.documents}
          optionLabel="name"
          optionValue="_id"
          id="apartments"
          value={apartments}
          label="Căn hộ (*)"
          setValue={setApartments}
        />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailApartmentGroup;
