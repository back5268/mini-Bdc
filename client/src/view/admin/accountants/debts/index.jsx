import { getListDebtLogApi, getListMonthApi } from '@api';
import { DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Chipz, Dropdownz, Hrz, InputCalendarz, Spinnerz } from '@components/core';
import { debtStatus } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import Calculator from './Calculator';
import DetaiDebt from './Detail';

const Debts = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const { isLoading, data } = useGetApi(getListDebtLogApi, params, 'debts');
  const { data: months } = useGetApi(getListMonthApi, {}, 'months');

  const columns = [
    { label: 'Tiêu đề', field: 'title' },
    { label: 'Tháng', field: 'month' },
    { label: 'Thành công', field: 'success' },
    { label: 'Thất bại', field: 'error' },
    {
      label: 'Trạng thái',
      body: (e) =>
        e.status === 1 ? (
          <div className="flex items-center justify-center gap-4 font-medium">
            <Spinnerz className="h-6 w-6" /> <span>Đang xử lý</span>
          </div>
        ) : (
          <Chipz value="Đã xử lý" />
        )
    },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) }
  ];

  return (
    <FormList title="Lịch sử tính toán công nợ">
      <Calculator open={open} setOpen={setOpen} setParams={setParams} />
      <DetaiDebt open={openDetail} setOpen={setOpenDetail} data={data?.documents} />
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
          onViewDetail: (item) => setOpenDetail(item._id)
        }}
      />
    </FormList>
  );
};

export default Debts;
