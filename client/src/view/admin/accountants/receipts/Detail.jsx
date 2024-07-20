import { ReceiptValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addReceiptApi, getCoinByApartmentApi, getListBillByApartmentApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp, formatNumber } from '@lib/helper';
import { DropdownForm, InputForm, TextAreaz } from '@components/core';
import { paymentType } from '@constant';
import { useDataState } from '@store';
import { useGetApi } from '@lib/react-query';

const defaultValues = {
  apartment: '',
  payer: '',
  bill: '',
  type: '',
  paymentType: '',
  amount: '',
  note: ''
};

const DetailReceipt = (props) => {
  const { open, setOpen, setParams, data, type, apartments } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};
  const title = type === 1 ? 'Phiếu thu' : type === 2 ? 'Phiếu hoàn tiền' : 'Phiếu hạch toán';
  const { residents } = useDataState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(ReceiptValidation),
    defaultValues
  });

  const { data: bills } = useGetApi(getListBillByApartmentApi, { _id: watch('apartment') }, 'bills', Boolean(watch('apartment')));
  const { data: coin } = useGetApi(getCoinByApartmentApi, { _id: watch('apartment') }, 'coin', Boolean(watch('apartment')));
  const bill = bills?.find((b) => b._id === watch('bill'));

  useEffect(() => {
    if (isUpdate) {
      item.apartment = item.apartment?._id;
      item.payer = item.payer?._id;
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data, type };
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  useEffect(() => {
    if (coin && type === 3) {
      setValue('amount', coin > bill?.amount - bill?.paid ? bill?.amount - bill?.paid : coin);
    }
  }, [coin, bill?.amount, bill?.paid]);

  return (
    <FormDetail
      title={title}
      open={open}
      setOpen={() => {
        setOpen(false);
        reset();
      }}
      isUpdate={isUpdate}
      createApi={addReceiptApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <div className="w-full flex flex-wrap">
          <DropdownForm
            id="apartment"
            label="Căn hộ (*)"
            options={apartments}
            optionLabel="name"
            optionValue="_id"
            errors={errors}
            watch={watch}
            setValue={setValue}
            disabled={isUpdate}
          />
          <div className="w-full lg:w-6/12 flex flex-col justify-center items-center">
            <span className="text-xl font-bold text-red-400">Tiền thừa căn hộ: {formatNumber(coin)}</span>
            {!isUpdate && (
              <span className="text-xl font-bold text-red-400">
                Tiền nợ hóa đơn {bill?.code}: {formatNumber(bill?.amount - bill?.paid)}
              </span>
            )}
            {!watch('apartment') && <i>Vui lòng chọn căn hộ</i>}
          </div>
        </div>
        {[1, 3].includes(type) && (
          <DropdownForm
            id="bill"
            label="Hóa đơn"
            options={bills || []}
            optionLabel="code"
            optionValue="_id"
            errors={errors}
            watch={watch}
            setValue={setValue}
            disabled={isUpdate}
            emptyMessage={watch('apartment') ? 'Căn hộ không có hóa đơn cần thanh toán' : 'Vui lòng chọn căn hộ'}
          />
        )}
        <DropdownForm
          id="payer"
          label="Người tạo (*)"
          options={residents || []}
          optionLabel="fullName"
          optionValue="_id"
          errors={errors}
          watch={watch}
          setValue={setValue}
          disabled={isUpdate}
        />
        <DropdownForm
          id="paymentType"
          label="Hình thức (*)"
          disabled={isUpdate}
          options={paymentType.filter(p => p.key !== 3)}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <InputForm
          min="1"
          id="amount"
          type="number"
          label="Số tiền (*)"
          disabled={isUpdate || type === 3}
          errors={errors}
          register={register}
        />
        <TextAreaz id="note" label="Ghi chú" value={watch('note')} setValue={(e) => setValue('note', e)} disabled={isUpdate} />
      </div>
    </FormDetail>
  );
};

export default DetailReceipt;
