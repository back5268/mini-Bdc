import { VehicleValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addVehicleApi, detailVehicleApi, getListServiceInfoApi, updateVehicleApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { InputForm, TextAreaz } from '@components/core';
import { useParams } from 'react-router-dom';
import { useGetApi } from '@lib/react-query';
import { UploadFiles } from '@components/shared';
import { useDataState } from '@store';
import { vehicleType } from '@constant';

const defaultValues = {
  name: '',
  licensePlate: '',
  apartment: '',
  service: '',
  type: '',
  description: ''
};

const DetailVehicle = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailVehicleApi, { _id }, 'vehicle', isUpdate);
  const { data: services } = useGetApi(getListServiceInfoApi, { status: 1, type: 4 }, 'services');
  const [files, setFiles] = useState([]);
  const { apartments } = useDataState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(VehicleValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      if (item.files) setFiles(item.files);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    let newData = { ...data };
    if (isUpdate) newData = { ...checkEqualProp(newData, item), _id };
    if (files?.length > 0) {
      if (JSON.stringify(files) !== JSON.stringify(item?.files)) {
        const newfiles = [];
        const formData = [];
        files.forEach((f) => {
          if (item?.files.some((i) => JSON.stringify(i) === JSON.stringify(f))) newfiles.push(f);
          else formData.push(f);
        });
        if (newfiles.length > 0) newData.files = newfiles;
        if (formData.length > 0) newData.formData = { files: formData };
      }
    } else if (item?.files?.length > 0) newData.files = [];
    return newData;
  };

  return (
    <FormDetail
      type="nomal"
      title="phương tiện"
      isUpdate={isUpdate}
      createApi={addVehicleApi}
      updateApi={updateVehicleApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="name" label="Tên phương tiện (*)" errors={errors} register={register} />
        <InputForm id="licensePlate" label="Biển số xe (*)" errors={errors} register={register} />
        <DropdownForm id="type" label="Loại phương tiện (*)" options={vehicleType} errors={errors} watch={watch} setValue={setValue} />
        <DropdownForm
          id="apartment"
          label="Căn hộ (*)"
          options={apartments?.map((p) => ({ key: p._id, label: `${p.name} - ${p.code}` }))}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <DropdownForm
          id="service"
          label="Dịch vụ (*)"
          options={services
            ?.filter((a) => a.vehicleType === Number(watch('type')))
            ?.map((p) => ({ key: p._id, label: `${p.name} - ${p.code}` }))}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
        <div className="flex flex-wrap w-full">
          <UploadFiles label="Hình ảnh phương tiện" type="image" files={files} setFiles={setFiles} />
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailVehicle;
