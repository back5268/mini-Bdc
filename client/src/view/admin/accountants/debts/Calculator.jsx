import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Buttonz, Dialogz, DropdownForm, Hrz, InputCalendarForm, InputCalendarz } from '@components/core';
import { Loading } from '@components/shared';
import { usePostApi } from '@lib/react-query';
import { calculatorDebtApi } from '@api';
import { calculationRange, serviceType } from '@constant';
import { DebtValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { DataTable } from '@components/base';

const Calculator = (props) => {
  const { open, setOpen, setParams } = props;
  const { mutateAsync, isPending } = usePostApi(calculatorDebtApi);
  const [select, setSelect] = useState([]);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(DebtValidation)
  });

  const onSubmit = async (e) => {
    const data = handleData(e);
    if (typeof data === 'string') {
      showToast({ title: data, severity: 'error' });
      return;
    }
    const response = await mutateAsync(data);
    if (response) {
      onSuccess();
      showToast({ title: 'Đã thêm hàng chờ tính toán công nợ', severity: 'success' });
      setOpen(false);
      reset();
      setParams((pre) => ({ ...pre, render: !pre.render }));
    }
  };

  const handleData = (data) => {
    const newData = { ...data };
    return newData;
  };

  const columns = [
    { label: 'Tên dịch vụ', field: 'name' },
    { label: 'Ngày bắt đầu', body: (e) => <InputCalendarz className="!w-full" label="Ngày bắt đầu" /> },
    { label: 'Ngày kết thúc', body: (e) => <InputCalendarz className="!w-full" label="Ngày kết thúc" /> }
  ];

  return (
    <Dialogz
      className="w-[1000px]"
      title="Tính toán công nợ"
      open={open}
      setOpen={() => {
        setOpen(false);
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-h-[500px] overflow-scroll">
          <div className="relative w-full mt-4">
            {isPending && <Loading />}
            <div className="flex flex-col items-center justify-center ">
              <div className="w-full lg:w-6/12">
                <InputCalendarForm id="month" label="Kỳ tháng (*)" errors={errors} setValue={setValue} watch={watch} className="!w-full" />
                <InputCalendarForm
                  id="deadline"
                  label="Hạn thanh toán (*)"
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                  className="!w-full"
                />
                <DropdownForm
                  id="type"
                  label="Phạm vi tính toán (*)"
                  options={calculationRange}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  className="!w-full"
                />
                {Number(watch('type')) === 2 && (
                  <DropdownForm
                    id="groupApartmens"
                    label="Nhóm căn hộ (*)"
                    options={calculationRange}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    className="!w-full"
                  />
                )}
                {Number(watch('type')) === 3 && (
                  <DropdownForm
                    id="groupApartmens"
                    label="Căn hộ (*)"
                    options={calculationRange}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    className="!w-full"
                  />
                )}
              </div>
              <div className="w-full">
                <DataTable
                  select={select}
                  setSelect={setSelect}
                  isPagination={false}
                  data={serviceType.map((s) => ({ name: s.label, _id: s.key }))}
                  columns={columns}
                  hideParams={true}
                />
              </div>
            </div>
          </div>
        </div>
        <Hrz className="my-4" />
        <div className="flex gap-4 justify-end">
          <Buttonz variant="outlined" color="red" label="Hủy" onClick={() => setOpen(false)} />
          <Buttonz loading={isPending} type="submit" label="Xác nhận" />
        </div>
      </form>
    </Dialogz>
  );
};

export default Calculator;
