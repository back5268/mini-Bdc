import { autoAccountingApi, getListCoinApi } from '@api';
import { DataTable, FormList, DataFilter } from '@components/base';
import { Dropdownz, Hrz } from '@components/core';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import { useDataState, useToastState } from '@store';
import { formatNumber } from '@lib/helper';

const Coins = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState({ ...initParams, page: 1, limit: 100 });
  const [filter, setFilter] = useState({});
  const [select, setSelect] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoading, data } = useGetApi(getListCoinApi, { ...params, limit: undefined, page: undefined }, 'coins');
  const { apartments } = useDataState();
  const { showToast } = useToastState();
  const amount = data?.reduce((a, b) => a + b.coin, 0);

  const columns = [
    { label: 'Căn hộ', field: 'name' },
    { label: 'Mã căn hộ', field: 'code' },
    { label: 'Tổng tiền thừa', body: (e) => formatNumber(e.coin) }
  ];

  const autoAccouting = async () => {
    setLoading(true)
    const response = await autoAccountingApi({ _ids: select });
    if (response) {
      showToast({ title: 'Hạch toán tự động thành công', severity: 'success' });
      setParams((pre) => ({ ...pre, render: !pre.render }));
      setLoading(false)
      setSelect([])
    }
  };

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
      <div className="w-full text-center mt-4">
        <span className="font-medium">
          Tổng tiền thừa: <span className="text-red-600 text-xl font-semibold">{formatNumber(amount)}</span>
        </span>
      </div>
      <DataTable
        title="tiền thừa"
        isLoading={isLoading || loading}
        data={data}
        total={data?.length}
        columns={columns}
        params={params}
        setParams={setParams}
        rows={[]}
        select={select}
        setSelect={setSelect}
        headerInfo={{
          moreHeader: [{ children: () => 'Hạch toán tự động', onClick: () => autoAccouting() }]
        }}
      />
    </FormList>
  );
};

export default Coins;
