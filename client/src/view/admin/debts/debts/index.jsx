import { getListDebtApi, getListMonthApi } from '@api';
import { DataTable, FormList, NumberBody, DataFilter, Body } from '@components/base';
import { Dropdownz, Hrz } from '@components/core';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import { useDataState } from '@store';

const Debts = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState({ ...initParams, page: 1, limit: 100 });
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListDebtApi, { ...params, limit: undefined, page: undefined }, 'debts');
  const { data: months } = useGetApi(getListMonthApi, {}, 'months');
  const { apartments } = useDataState();

  const columns = [
    { label: 'Căn hộ', body: (e) => Body(apartments, e.apartment, '_id', 'name') },
    { label: 'Mã căn hộ', body: (e) => Body(apartments, e.apartment, '_id', 'code') },
    { label: 'Tháng', field: 'month' },
    { label: 'Số dư đầu kỳ', body: (e) => NumberBody(e.before) },
    { label: 'Phát sinh trong tháng', body: (e) => NumberBody(e.amount) },
    { label: 'Thanh toán', body: (e) => NumberBody(e.paid) },
    { label: 'Số dư cuối kỳ', body: (e) => NumberBody(e.before + e.amount - e.paid) }
  ];

  return (
    <FormList title="Danh sách công nợ">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
        <Dropdownz
          value={filter.apartment}
          onChange={(e) => setFilter({ ...filter, apartment: e })}
          options={apartments}
          optionLabel="name"
          optionValue="_id"
          label="Căn hộ"
        />
        <Dropdownz value={filter.month} onChange={(e) => setFilter({ ...filter, month: e })} options={months} label="Tháng" />
      </DataFilter>
      <Hrz />
      <DataTable
        title="công nợ"
        isLoading={isLoading}
        data={data}
        total={data?.length}
        columns={columns}
        params={params}
        setParams={setParams}
      />
    </FormList>
  );
};

export default Debts;
