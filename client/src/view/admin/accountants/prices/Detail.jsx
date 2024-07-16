import { addPriceApi, detailPriceApi, updatePriceApi } from '@api';
import { FormDetail } from '@components/base';
import { Buttonz, DropdownForm, Hrz, InputForm, TextAreaz } from '@components/core';
import { priceType, serviceType } from '@constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { PriceValidation } from '@lib/validation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Price from './Price';

const defaultValues = {
  name: '',
  code: '',
  recipe: 1,
  prices: "",
  serviceType: '',
  description: ''
};

const DetailPrice = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailPriceApi, { _id }, 'price', isUpdate);
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
      if (item.recipe === 1) item.prices = Number(item.prices?.[0]?.amount);
      else setPrices(item.prices);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    let newData = { ...data };
    if (Number(newData.recipe) === 1) {
      if (!newData.prices) return 'Vui lòng nhập giá tiền';
      else {
        if (Number(newData.prices) < 0) return "Giá tiền phải lớn hơn 0"
        newData.prices = [{ from: 0, to: 0, amount: newData.prices }];
      }
    } else newData.prices = prices.map((p) => ({ ...p, key: undefined }));
    if (isUpdate) newData = { ...checkEqualProp(newData, item), _id };
    return newData;
  };

  return (
    <FormDetail
      type="nomal"
      title="bảng giá"
      isUpdate={isUpdate}
      createApi={addPriceApi}
      updateApi={updatePriceApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputForm id="name" label="Tên bảng giá (*)" errors={errors} register={register} />
        <InputForm id="code" label="Mã bảng giá (*)" errors={errors} register={register} />
        <DropdownForm
          id="serviceType"
          label="Loại dịch vụ (*)"
          options={serviceType}
          errors={errors}
          watch={watch}
          setValue={setValue}
          onChange={(e) => {
            setValue('serviceType', e);
            if ([1, 4, 5].includes(Number(e))) setValue('recipe', 1);
          }}
        />
        <DropdownForm
          id="recipe"
          label="Loại bảng giá (*)"
          options={priceType}
          errors={errors}
          watch={watch}
          setValue={setValue}
          disabled={[1, 4, 5].includes(Number(watch('serviceType')))}
        />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} setValue={(e) => setValue('description', e)} />
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
            <InputForm min="1" type="number" id="prices" label="Giá tiền (*)" errors={errors} register={register} />
          ) : (
            prices.map((price, index) => <Price key={index} price={price} setPrices={setPrices} disabled={prices.length <= 1} />)
          )}
        </div>
      </div>
    </FormDetail>
  );
};

export default DetailPrice;
