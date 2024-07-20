import { getListDebtApi } from '@api';
import { DataTable, FormList, DataFilter } from '@components/base';
import { Dropdownz, Hrz } from '@components/core';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import { useDataState } from '@store';
import { formatNumber } from '@lib/helper';

const Debts = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState({ ...initParams, page: 1, limit: 100 });
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListDebtApi, { ...params, limit: undefined, page: undefined }, 'debts');
  const { apartments } = useDataState();
  const amount = data?.reduce((a, b) => a + b.amount, 0);

  const columns = [
    { label: 'Căn hộ', field: 'name' },
    { label: 'Mã căn hộ', field: 'code' },
    { label: 'Còn nợ', body: (e) => formatNumber(e.amount) }
  ];

  return (
    <FormList title="Danh sách công nợ">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-9/12">
        <Dropdownz
          value={filter.apartment}
          onChange={(e) => setFilter({ ...filter, apartment: e })}
          options={apartments}
          optionLabel="name"
          optionValue="_id"
          label="Căn hộ"
        />
      </DataFilter>
      <Hrz />
      <div className="w-full text-center mt-4">
        <span className="font-medium">
          Tổng tiền nợ: <span className="text-red-600 text-xl font-semibold">{formatNumber(amount)}</span>
        </span>
      </div>
      <DataTable
        title="công nợ"
        isLoading={isLoading}
        data={data}
        total={data?.length}
        columns={columns}
        params={params}
        setParams={setParams}
        rows={[]}
      />
    </FormList>
  );
};

export default Debts;
