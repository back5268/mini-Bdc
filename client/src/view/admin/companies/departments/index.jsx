import { getListDepartmentApi, getListProjectInfoApi, updateDepartmentApi } from '@api';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Chipz, Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import DetailDepartment from './Detail';

const Departments = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListDepartmentApi, params, 'departments');
  const { data: projects } = useGetApi(getListProjectInfoApi, {}, 'projects');

  const columns = [
    { label: 'Tên phòng ban', field: 'name' },
    { label: 'Mã phòng ban', field: 'code' },
    { label: 'Mô tả', field: 'description' },
    {
      label: 'Dự án quản lý',
      body: (e) => {
        return (
          <div className="flex flex-wrap gap-2 w-full">
            {e.projects?.map((user, index) => {
              const label = projects?.find((u) => u._id === user)?.name;
              return <Chipz key={index} value={label} className="text-center" />;
            })}
          </div>
        );
      }
    },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Thời gian cập nhật', body: (e) => TimeBody(e.updatedAt) }
  ];

  return (
    <FormList title="Danh sách phòng ban">
      <DetailDepartment open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} projects={projects} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tiêu đề, mã"
        />
        <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={statuses} label="Trạng thái" />
      </DataFilter>
      <Hrz />
      <DataTable
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id)
        }}
        statusInfo={{ changeStatusApi: updateDepartmentApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      />
    </FormList>
  );
};

export default Departments;
