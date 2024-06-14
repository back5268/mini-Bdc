import { getListCoinApi } from '@api';
import { DataTable, FormList, NumberBody, DataFilter } from '@components/base';
import { Dropdownz, Hrz } from '@components/core';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import { useDataState } from '@store';

const Coins = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListCoinApi, params, 'coins');
  const { apartments } = useDataState();

  const columns = [
    { label: 'Căn hộ', body: (e) => e.apartment?.name },
    { label: 'Mã căn hộ', body: (e) => e.apartment?.code },
    { label: 'Tổng tiền thừa', body: (e) => NumberBody(e.coinAfter) }
  ];

  return (
    <FormList title="Danh sách tiền thừa">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-9/12 md:w-6/12">
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
      <DataTable
        title="tiền thừa"
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
      />
    </FormList>
  );
};

export default Coins;
