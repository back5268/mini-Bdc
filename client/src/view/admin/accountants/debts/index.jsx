import { getListDebtLogApi, getListMonthApi } from '@api';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, InputCalendarz, Spinnerz } from '@components/core';
import { debtStatus } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import Calculator from './Calculator';

const Debts = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListDebtLogApi, params, 'debts');
  const { data: months } = useGetApi(getListMonthApi, params, 'months');

  const columns = [
    { label: 'Tiêu đề', field: 'title' },
    { label: 'Tháng', field: 'month' },
    { label: 'Thành công', field: 'success' },
    { label: 'Thất bại', field: 'error' },
    { label: 'Trạng thái', body: (e) => (e.status === 1 ? <Spinnerz /> : 'Đã xử lý') },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) }
  ];

  return (
    <FormList title="Lịch sử tính toán công nợ">
      <Calculator open={open} setOpen={setOpen} setParams={setParams} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="!w-full">
        <InputCalendarz value={filter.from} onChange={(e) => setFilter({ ...filter, from: e })} label="Từ ngày" />
        <InputCalendarz value={filter.to} onChange={(e) => setFilter({ ...filter, to: e })} label="Đến ngày" />
        <Dropdownz value={filter.month} onChange={(e) => setFilter({ ...filter, month: e })} options={months} label="Tháng" />
        <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={debtStatus} label="Trạng thái" />
      </DataFilter>
      <Hrz />
      <DataTable
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['detail']}
        headerInfo={{ moreHeader: [{ children: () => 'Tính toán công nợ', onClick: () => setOpen(true) }] }}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id)
        }}
      />
    </FormList>
  );
};

export default Debts;
