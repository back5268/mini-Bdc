import { getListDebtLogApi, getListMonthApi } from '@api';
import { DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Chipz, Dropdownz, Hrz, InputCalendarz, Spinnerz } from '@components/core';
import { debtStatus } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useEffect, useState } from 'react';
import Calculator from './Calculator';
import DetaiDebt from './Detail';
import { socket } from '@lib/socket-io';
import { useUserState } from '@store';
import { CalculatorIcon } from '@heroicons/react/24/outline';

const Calculatorz = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const { isLoading, data } = useGetApi(getListDebtLogApi, params, 'debts');
  const { data: months } = useGetApi(getListMonthApi, {}, 'months');
  const { project } = useUserState();

  const columns = [
    { label: 'Tiêu đề', field: 'title' },
    { label: 'Tháng', field: 'month' },
    { label: 'Thành công', field: 'success' },
    { label: 'Thất bại', field: 'error' },
    {
      label: 'Trạng thái',
      body: (e) =>
        e.status === 1 ? (
          <div className="flex items-center justify-center gap-4 font-medium bg-amber-300 p-2 rounded-lg text-white uppercase text-xs">
            <Spinnerz className="h-5 w-5" color="white" /> <span>Đang xử lý</span>
          </div>
        ) : (
          <Chipz value="Đã xử lý" />
        )
    },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) }
  ];

  useEffect(() => {
    const key = `calculatorDebt${project}`;
    console.log(key);
    function onConnect() {
      console.log('Connecting...');
    }

    function onDisconnect(reason) {
      console.log('Disconnecting...', reason);
    }

    function onEvent(event) {
      console.log(event);
      setParams((pre) => ({ ...pre, render: !pre.render }));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on(key, onEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off(key, onEvent);
    };
  }, [project]);

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
        headerInfo={{
          moreHeader: [
            {
              children: () => (
                <div className="flex gap-2 items-center">
                  <CalculatorIcon className="h-5 w-5 stroke-2" />
                  Tính toán công nợ
                </div>
              ),
              onClick: () => setOpen(true)
            }
          ]
        }}
        actionsInfo={{
          onViewDetail: (item) => setOpenDetail(item._id)
        }}
      />
    </FormList>
  );
};

export default Calculatorz;
