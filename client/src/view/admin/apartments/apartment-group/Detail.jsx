import { addApartmentGroupApi, detailApartmentGroupApi, updateApartmentGroupApi } from '@api';
import { FormDetail } from '@components/base';
import { InputForm, MultiSelectForm, TextAreaz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { ApartmentGroupValidation } from '@lib/validation';
import { useDataState } from '@store';
import { useEffect } from 'react';
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
  const { apartments } = useDataState();

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
      title="nhóm căn hộ"
      isUpdate={isUpdate}
      createApi={addApartmentGroupApi}
      updateApi={updateApartmentGroupApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="name" label="Tên nhóm căn hộ (*)" errors={errors} register={register} />
        <MultiSelectForm
          options={apartments}
          optionLabel="name"
          optionValue="_id"
          id="apartments"
          watch={watch}
          label="Căn hộ (*)"
          setValue={setValue}
          errors={errors}
        />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailApartmentGroup;
