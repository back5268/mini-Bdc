import { getListLogApi } from '@api';
import { Body, DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, InputCalendarz } from '@components/core';
import { logStatus, logType } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import DetailLog from './Detail';

const Logs = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListLogApi, params, 'logs');

  const columns = [
    { label: 'Địa chỉ nhận', field: 'to' },
    { label: 'Tiêu đề', field: 'subject' },
    { label: 'Loại thông báo', body: (e) => Body(logType, e.type) },
    { label: 'Thời gian gửi', body: (e) => TimeBody(e.createdAt) },
    { label: 'Trạng thái', body: (e) => Body(logStatus, e.status) }
  ];

  return (
    <FormList title="Lịch sử gửi email">
      <DetailLog open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="!w-full">
        <InputCalendarz value={filter.fromDate} onChange={(e) => setFilter({ ...filter, fromDate: e })} label="Từ ngày" />
        <InputCalendarz value={filter.toDate} onChange={(e) => setFilter({ ...filter, toDate: e })} label="Đến ngày" />
        <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={logStatus} label="Trạng thái" />
        <Dropdownz value={filter.type} onChange={(e) => setFilter({ ...filter, type: e })} options={logType} label="Loại thông báo" />
      </DataFilter>
      <Hrz />
      <DataTable
        isLoading={isLoading}
        data={data?.documents}
        totalRecord={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['detail']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id)
        }}
      />
    </FormList>
  );
};

export default Logs;
