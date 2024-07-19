import { ServiceValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addServiceApi, checkApartmentApi, detailServiceApi, updateServiceApi } from '@api';
import { DataTable, FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { Buttonz, DropdownForm, Hrz, InputForm, MultiSelectz } from '@components/core';
import { useParams } from 'react-router-dom';
import { useGetApi } from '@lib/react-query';
import { priceType, serviceType, vehicleType } from '@constant';
import Price from '../prices/Price';

const defaultValues = {
  type: '',
  price: '',
  vehicleType: '',
  recipe: 1,
  prices: ''
};

const Apartments = (props) => {
  const { apartmentData = [], apartments = [], setApartments = () => {} } = props;
  const columns = [
    { label: 'Tên căn hộ', field: 'name' },
    { label: 'Mã căn hộ', field: 'code' },
    { label: 'Diện tích', field: 'area' },
    { label: 'Tầng', field: 'floor' }
  ];

  return (
    <div className="flex flex-col">
      <MultiSelectz
        label="Chọn căn hộ áp dụng"
        value={apartments}
        onChange={setApartments}
        options={apartmentData.map((u) => ({ key: u._id, label: `${u.name} - ${u.code}` }))}
        className="my-2 lg:w-6/12 mt-2"
        emptyMessage="Vui lòng chọn loại dịch vụ"
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
  const [prices, setPrices] = useState([{ key: 1 }]);

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

  const { data: apartmentData } = useGetApi(
    checkApartmentApi,
    { service: _id, type: watch('type'), vehicleType: watch('vehicleType') },
    'apartments',
    Boolean(watch('type'))
  );

  useEffect(() => {
    if (isUpdate && item) {
      if (item.recipe === 1) item.prices = Number(item.prices?.[0]?.amount);
      if (item.prices) setPrices(item.prices);
      if (item.apartments?.length > 0) setApartments(item.apartments);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    let newData = { ...data };
    if (apartments?.length > 0) newData.apartments = apartments;
    if (Number(newData.recipe) === 1) {
      if (!newData.prices) return 'Vui lòng nhập giá tiền';
      else newData.prices = [{ from: 0, to: 0, amount: newData.prices }];
    } else {
      newData.prices = prices
        .filter((p) => Number(p.from) > 0 && Number(p.to) > 0 && Number(p.amount) > 0)
        .map((p) => ({ ...p, key: undefined }));
      if (newData.prices.length < prices.length) return 'Vui lòng nhập đủ các thông tin về giá, các giá trị phải lớn hơn 0';
    }
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
        <DropdownForm
          id="recipe"
          label="Loại bảng giá (*)"
          options={priceType}
          errors={errors}
          watch={watch}
          setValue={setValue}
          disabled={[1, 4, 5].includes(Number(watch('type')))}
        />
        <div className="w-full mt-4">
          <div className="p-2">
            <div className="flex justify-between items-center">
              <label className="inline-block font-medium text-left mb-2">Thông tin giá</label>
              {Number(watch('recipe')) !== 1 && (
                <Buttonz
                  onClick={() => setPrices((pre) => [...pre, { key: (pre[pre.length - 1]?.key || 1) + 1 }])}
                  variant="outlined"
                  label="Thêm mới"
                  className="mb-2"
                />
              )}
            </div>
            <Hrz />
          </div>
          {Number(watch('recipe')) === 1 ? (
            <InputForm type="number" min="1" id="prices" label="Giá tiền (*)" errors={errors} register={register} />
          ) : (
            prices.map((price, index) => <Price key={index} price={price} setPrices={setPrices} disabled={prices.length <= 1} />)
          )}
        </div>
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
