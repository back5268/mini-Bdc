import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Buttonz, Dialogz, DropdownForm, Hrz, InputCalendarForm, InputCalendarz, Inputz, MultiSelectForm } from '@components/core';
import { Loading } from '@components/shared';
import { useGetApi, usePostApi } from '@lib/react-query';
import { calculatorDebtApi, getListApartmentGroupInfoApi, getListMonthApi } from '@api';
import { calculationRange, serviceType } from '@constant';
import { DebtValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { DataTable } from '@components/base';
import { useDataState, useToastState } from '@store';
import { useEffect } from 'react';
import moment from 'moment';

const Calculator = (props) => {
  const { open, setOpen, setParams } = props;
  const { mutateAsync, isPending } = usePostApi(calculatorDebtApi);
  const [select, setSelect] = useState([]);
  const [services, setServices] = useState([]);
  const { apartments } = useDataState();
  const { showToast } = useToastState();
  const { data: apartmentGroups } = useGetApi(getListApartmentGroupInfoApi, {}, 'apartmentGroups');
  const { data: months } = useGetApi(getListMonthApi, {}, 'months');

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(DebtValidation)
  });

  useEffect(() => {
    const date = new Date();
    setServices(
      serviceType.map((s) => ({
        name: s.label,
        _id: s.key,
        type: s.key,
        from: new Date(date.getFullYear(), date.getMonth() - 1, 1),
        to: new Date(date.getFullYear(), date.getMonth(), 1),
        discount: 0
      }))
    );
  }, [JSON.stringify(serviceType)]);

  const handleData = (data) => {
    const newData = { ...data };
    if (Number(newData.type) === 1) newData.apartments = apartments.map((a) => a._id);
    else if (Number(newData.type) === 2) {
      let newApartments = [];
      apartmentGroups.forEach((a) => {
        if (newData.groupApartmens?.includes(a._id)) newApartments = [...newApartments, ...a.apartments];
      });
      newData.apartments = newApartments;
    }
    if (!(newData.apartments?.length > 0)) return 'Vui lòng chọn căn hộ tính phí!';
    newData.services = services
      .filter((s) => select.includes(s._id))
      ?.map((s) => ({
        ...s,
        _id: undefined,
        from: moment(s.from).format('YYYY-MM-DD HH:mm:ss'),
        to: moment(s.to).format('YYYY-MM-DD HH:mm:ss')
      }));
    if (!(newData.services?.length > 0)) return 'Vui lòng chọn dịch vụ tính phí!';
    newData.deadline = moment(newData.deadline).format('YYYY-MM-DD');
    newData.type = undefined;
    newData.groupApartmens = undefined
    return newData;
  };

  const onSubmit = async (e) => {
    const data = handleData(e);
    if (typeof data === 'string') {
      showToast({ title: data, severity: 'error' });
      return;
    }
    const response = await mutateAsync(data);
    if (response) {
      showToast({ title: 'Đã thêm hàng chờ tính toán công nợ', severity: 'success' });
      setOpen(false);
      setSelect([]);
      reset();
      setParams((pre) => ({ ...pre, render: !pre.render }));
    }
  };

  const onChangeTable = (key, field, value) => {
    if (key && field) {
      setServices((pre) =>
        pre.map((p) => {
          if (p._id === key) p[field] = value;
          return { ...p };
        })
      );
    }
  };

  const columns = [
    { label: 'Tên dịch vụ', field: 'name' },
    {
      label: 'Ngày bắt đầu',
      body: (item) => (
        <InputCalendarz className="!w-full" label="Ngày bắt đầu" value={item.from} onChange={(e) => onChangeTable(item._id, 'from', e)} />
      )
    },
    {
      label: 'Ngày kết thúc',
      body: (item) => (
        <InputCalendarz className="!w-full" label="Ngày kết thúc" value={item.to} onChange={(e) => onChangeTable(item._id, 'to', e)} />
      )
    },
    {
      label: 'Giảm trừ',
      body: (item) => (
        <Inputz
          min="0"
          type="number"
          className="!w-full"
          label="Giảm trừ"
          value={item.discount}
          onChange={(e) => onChangeTable(item._id, 'discount', e.target.value)}
        />
      )
    }
  ];

  return (
    <Dialogz
      className="w-[1200px]"
      title="Tính toán công nợ"
      open={open}
      setOpen={() => {
        setOpen(false);
        setSelect([]);
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-h-[500px] overflow-scroll">
          <div className="relative w-full mt-4">
            {isPending && <Loading />}
            <div className="flex flex-col items-center justify-center ">
              <div className="w-full lg:w-6/12">
                <DropdownForm
                  id="month"
                  label="Kỳ tháng (*)"
                  options={months}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  className="!w-full"
                />
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
                  onChange={(e) => {
                    setValue('type', e);
                    setValue('groupApartmens', undefined);
                    setValue('apartments', undefined);
                  }}
                  className="!w-full"
                />
                {Number(watch('type')) === 2 && (
                  <MultiSelectForm
                    id="groupApartmens"
                    label="Nhóm căn hộ (*)"
                    options={apartmentGroups}
                    watch={watch}
                    setValue={setValue}
                    className="!w-full"
                    optionLabel="name"
                    optionValue="_id"
                  />
                )}
                {Number(watch('type')) === 3 && (
                  <MultiSelectForm
                    id="apartments"
                    label="Căn hộ (*)"
                    options={apartments}
                    watch={watch}
                    setValue={setValue}
                    className="!w-full"
                    optionLabel="name"
                    optionValue="_id"
                  />
                )}
              </div>
              <div className="w-full">
                <DataTable select={select} setSelect={setSelect} isPagination={false} data={services} columns={columns} hideParams={true} />
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
