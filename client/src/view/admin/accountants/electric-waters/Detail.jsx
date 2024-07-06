import { ElectricWaterValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addElectricWaterApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp, databseDate } from '@lib/helper';
import { DropdownForm, InputCalendarForm, InputForm } from '@components/core';
import { UploadImage } from '@components/shared';
import { electricWaterType } from '@constant';
import { useDataState } from '@store';

const defaultValues = {
  apartment: '',
  type: '',
  month: '',
  beforeNumber: '',
  afterNumber: '',
  dateUpdate: new Date()
};

const DetailElectricWater = (props) => {
  const { open, setOpen, setParams, data, months } = props;
  const [avatar, setAvatar] = useState(null);
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};
  const { apartments } = useDataState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(ElectricWaterValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      if (item.image) setAvatar(item.image);
      if (item.dateUpdate) setValue('dateUpdate', new Date(item.dateUpdate));
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (avatar) newData.formData = { avatar };
    else if (item?.avatar) newData.avatar = '';
    if (newData.dateUpdate && newData.dateUpdate !== new Date(item?.dateUpdate)) newData.dateUpdate = databseDate(newData.dateUpdate);
    else newData.dateUpdate = undefined;
    if (Number(newData.beforeNumber) > Number(newData.afterNumber)) return "Chỉ số đầu không thể lớn hơn chỉ số cuối!"
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  return (
    <FormDetail
      title="chỉ số điện nước"
      open={open}
      setOpen={() => {
        setOpen(false);
        setAvatar(null);
        reset();
      }}
      isUpdate={isUpdate}
      createApi={addElectricWaterApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-4/12">
          <UploadImage label="Ảnh chốt số" data={avatar} setData={setAvatar} />
        </div>
        <div className="w-full lg:w-8/12">
          <div className="flex flex-wrap">
            <DropdownForm
              id="apartment"
              label="Căn hộ (*)"
              options={apartments}
              optionLabel="name"
              optionValue="_id"
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <DropdownForm
              id="type"
              label="Loại chốt số (*)"
              options={electricWaterType}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <DropdownForm id="month" label="Kỳ tháng (*)" options={months} errors={errors} watch={watch} setValue={setValue} />
            <InputForm min="0" type="number" id="beforeNumber" label="Chỉ số đầu (*)" errors={errors} register={register} />
            <InputForm min="0" type="number" id="afterNumber" label="Chỉ số cuối (*)" errors={errors} register={register} />
            <InputCalendarForm id="dateUpdate" label="Ngày chốt số" errors={errors} setValue={setValue} watch={watch} />
          </div>
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailElectricWater;
