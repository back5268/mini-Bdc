import { debtRemindApi, getListDebtApi } from '@api';
import { DataTable, FormList, DataFilter } from '@components/base';
import { Dropdownz, Hrz } from '@components/core';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import { useDataState, useToastState } from '@store';
import { formatNumber } from '@lib/helper';
import { BellAlertIcon } from '@heroicons/react/24/outline';

const Debts = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState({ ...initParams, page: 1, limit: 100 });
  const [filter, setFilter] = useState({});
  const [select, setSelect] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastState();
  const { isLoading, data } = useGetApi(getListDebtApi, { ...params, limit: undefined, page: undefined }, 'debts');
  const { apartments } = useDataState();
  const amount = data?.reduce((a, b) => a + b.amount, 0);

  const columns = [
    { label: 'Căn hộ', field: 'name' },
    { label: 'Mã căn hộ', field: 'code' },
    { label: 'Còn nợ', body: (e) => formatNumber(e.amount) }
  ];

  const debtRemind = async () => {
    const checkDebt = data.filter((d) => select.includes(d._id) && Number(d.amount) > 0);
    if (checkDebt.length === 0) return showToast({ title: 'Không có căn hộ còn nợ', severity: 'warning' });
    setLoading(true);
    const response = await debtRemindApi({ _ids: checkDebt.map((c) => c._id) });
    if (response) {
      showToast({ title: 'Nhắc nợ thành công', severity: 'success' });
      setParams((pre) => ({ ...pre, render: !pre.render }));
      setLoading(false);
      setSelect([]);
    }
  };

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
          moreHeader: [{ children: () => <div className='flex gap-2 items-center'>
            <BellAlertIcon className='h-5 w-5 stroke-2' />
            Nhắc nợ
          </div>, onClick: () => debtRemind(), color: 'red' }]
        }}
      />
    </FormList>
  );
};

export default Debts;
