import { deleteDepartmentApi, getListDepartmentApi, getListDepartmentInfoApi, getListProjectInfoApi, updateDepartmentApi } from '@api';
import { DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Chipz, Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import DetailDepartment from './Detail';
import { useDataState } from '@store';

const Departments = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListDepartmentApi, params, 'departments');
  const { data: projects } = useGetApi(getListProjectInfoApi, {}, 'projects');
  const { setDepartments } = useDataState()

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

  const onSuccess = async () => {
    const response = await getListDepartmentInfoApi();
    if (response) {
      setDepartments(response);
    }
  };

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
          onViewDetail: (item) => setOpen(item._id),
          deleteApi: deleteDepartmentApi
        }}
        statusInfo={{ changeStatusApi: updateDepartmentApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
        onSuccess={onSuccess}
      />
    </FormList>
  );
};

export default Departments;
