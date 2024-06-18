import { deleteDebitApi, getListDebitApi, getListMonthApi } from '@api';
import { DataTable, FormList, NumberBody, DataFilter, Body } from '@components/base';
import { Dropdownz, Hrz, InputCalendarz } from '@components/core';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import { serviceType } from '@constant';
import { useDataState } from '@store';

const Debits = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListDebitApi, params, 'debits');
  const { data: months } = useGetApi(getListMonthApi, {}, 'months');
  const { apartments } = useDataState();

  const columns = [
    { label: 'Bảng kê', field: 'bill' },
    { label: 'Tên dịch vụ', field: 'serviceName' },
    { label: 'Loại dịch vụ', body: (e) => Body(serviceType, e.serviceType) },
    { label: 'Tháng', field: 'month' },
    { label: 'Căn hộ', body: (e) => e.apartment?.name },
    { label: 'Đơn giá', body: (e) => NumberBody(e.price) },
    { label: 'Số lượng', body: (e) => NumberBody(e.quantity) },
    { label: 'Thành tiền', body: (e) => NumberBody(e.summary) }
  ];

  return (
    <FormList title="Danh sách bảng kê dịch vụ">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-9/12 md:w-6/12">
        <Dropdownz
          value={filter.apartment}
          onChange={(e) => setFilter({ ...filter, apartment: e })}
          options={apartments}
          optionLabel="name"
          optionValue="_id"
          label="Căn hộ"
        />
        <InputCalendarz value={filter.from} onChange={(e) => setFilter({ ...filter, from: e })} label="Từ ngày" />
        <InputCalendarz value={filter.to} onChange={(e) => setFilter({ ...filter, to: e })} label="Đến ngày" />
        <Dropdownz value={filter.month} onChange={(e) => setFilter({ ...filter, month: e })} options={months} label="Tháng" />
        <Dropdownz
          value={filter.serviceType}
          onChange={(e) => setFilter({ ...filter, serviceType: e })}
          options={serviceType}
          label="Loại dịch vụ"
        />
      </DataFilter>
      <Hrz />
      <DataTable
        title="bảng kê dịch vụ"
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['delete']}
        actionsInfo={{
          deleteApi: deleteDebitApi
        }}
      />
    </FormList>
  );
};

export default Debits;
