import { getListToolApi, updateToolApi } from '@api';
import { DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Dropdownz, Hrz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';

const Tools = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListToolApi, params, 'tools');

  const columns = [
    { label: 'Tên module', field: 'name' },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Thời gian cập nhật', body: (e) => TimeBody(e.updatedAt) }
  ];

  return (
    <FormList title="Danh sách quyền hiện có">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="md:w-6/12 lg:w-9/12">
        <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={statuses} label="Trạng thái" />
      </DataFilter>
      <Hrz />
      <DataTable
        isLoading={isLoading}
        data={data}
        total={data?.length}
        columns={columns}
        params={params}
        setParams={setParams}
        statusInfo={{ changeStatusApi: updateToolApi }}
      />
    </FormList>
  );
};

export default Tools;
