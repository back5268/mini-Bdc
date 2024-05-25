import { ServiceValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addServiceApi, checkApartmentApi, detailServiceApi, getListPriceInfoApi, updateServiceApi } from '@api';
import { DataTable, FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { DropdownForm, Hrz, InputForm, Inputz, MultiSelectz, TextAreaz } from '@components/core';
import { useParams } from 'react-router-dom';
import { useGetApi } from '@lib/react-query';
import { serviceType, vehicleType } from '@constant';
import Price from '../prices/Price';

const defaultValues = {
  name: '',
  code: '',
  type: '',
  price: '',
  vehicleType: ''
};

const Apartments = (props) => {
  const { apartmentData = [], apartments = [], setApartments = () => {} } = props;
  const columns = [
    { label: 'Tên căn hộ', field: 'name' },
    { label: 'Mã căn hộ', field: 'code' },
    { label: 'Diện tích', field: 'area' },
    { label: 'Trạng thái', field: 'status' },
  ];

  return (
    <div className="flex flex-col">
      <MultiSelectz
        label="Chọn căn hộ áp dụng (*)"
        value={apartments}
        setValue={setApartments}
        options={apartmentData.map((u) => ({ key: u._id, label: `${u.name} - ${u.code}` }))}
        className="my-2 lg:w-6/12 mt-2"
      />
      <DataTable
        total={apartments.length}
        data={apartmentData.filter((u) => apartments.includes(u._id))}
        columns={columns}
        baseActions={['delete']}
        hideParams={true}
        actionsInfo={{
          onDelete: (item) => {
            setApartments((pre) => pre.filter((v) => v !== item._id && v !== 'all'));
          }
        }}
      />
    </div>
  );
};

const DetailService = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailServiceApi, { _id }, 'service', isUpdate);
  const [apartments, setApartments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(ServiceValidation),
    defaultValues
  });

  const { data: prices } = useGetApi(getListPriceInfoApi, { serviceType: watch('type'), status: 1 }, 'prices');
  const { data: apartmentData } = useGetApi(
    checkApartmentApi,
    { service: _id, type: watch('type'), vehicleType: watch('vehicleType') },
    'apartments',
    isUpdate
  );
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (prices?.length > 0) {
      setPrice(prices.find((p) => p._id === watch('price')));
    }
  }, [prices, watch('price')]);

  useEffect(() => {
    if (isUpdate && item) {
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    let newData = { ...data };
    if (Number(newData.recipe) === 1) {
      if (!newData.Services) return 'Vui lòng nhập giá tiền';
      else newData.Services = [{ from: 0, to: 0, amount: newData.Services }];
    } else newData.Services = Services.map((p) => ({ ...p, key: undefined }));
    if (isUpdate) newData = { ...checkEqualProp(newData, item), _id };
    return newData;
  };

  return (
    <FormDetail
      type="nomal"
      title="dịch vụ"
      isUpdate={isUpdate}
      createApi={addServiceApi}
      updateApi={updateServiceApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="name" label="Tên dịch vụ (*)" errors={errors} register={register} />
        <InputForm id="code" label="Mã dịch vụ (*)" errors={errors} register={register} />
        <DropdownForm
          id="type"
          label="Loại dịch vụ (*)"
          options={serviceType}
          errors={errors}
          watch={watch}
          setValue={setValue}
          onChange={(e) => {
            setValue('type', e);
            setValue('price', undefined);
          }}
        />
        <DropdownForm
          id="price"
          label="Bảng giá (*)"
          options={prices?.map((p) => ({ key: p._id, label: `${p.name} - ${p.code}` }))}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        {Number(watch('type')) === 4 && (
          <DropdownForm
            id="vehicleType"
            label="Loại phương tiện (*)"
            options={vehicleType}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
        )}
        {Boolean(price) && (
          <div className="w-full mt-4">
            <div className="p-2">
              <label className="inline-block font-medium text-left mb-2">Thông tin bảng giá</label>
              <Hrz />
            </div>
            <div className="w-full">
              {price.recipe === 1 ? (
                <Inputz disabled type="number" label="Giá tiền" className="w-full !lg:w-full" value={price.prices?.[0]?.amount} />
              ) : (
                price.prices?.map((price, index) => <Price key={index} price={price} isView={true} index={index} />)
              )}
            </div>
          </div>
        )}
        <div className="w-full">
          <div className="p-2">
            <label className="inline-block font-medium text-left mb-2">Căn hộ áp dụng</label>
            <Hrz />
          </div>
          <div className="px-2">
            <Apartments apartmentData={apartmentData} apartments={apartments} setApartments={setApartments} />
          </div>
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailService;
