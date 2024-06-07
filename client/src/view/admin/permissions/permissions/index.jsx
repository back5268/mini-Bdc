import { deletePermissionApi, getListPermissionApi, updatePermissionApi } from '@api';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Chipz, Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useDataState } from '@store';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Permissions = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListPermissionApi, params, 'permissions');
  const { users } = useDataState();

  const columns = [
    { label: 'Tên nhóm quyền', field: 'name' },
    {
      label: 'Nhân sự',
      className: 'max-w-96',
      body: (e) => {
        return (
          <div className="flex flex-wrap gap-2 w-full">
            {e.users?.map((user, index) => {
              const label = users?.find((u) => u._id === user)?.fullName;
              return <Chipz key={index} value={label} className="text-center" />;
            })}
          </div>
        );
      }
    },
    { label: 'Mô tả', field: 'description' },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Thời gian cập nhật', body: (e) => TimeBody(e.updatedAt) }
  ];

  return (
    <FormList title="Danh sách nhóm quyền">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="md:w-6/12">
        <Inputz value={filter.keySearch} onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })} label="Tìm kiếm theo tên" />
        <Dropdownz
          value={filter.user}
          onChange={(e) => setFilter({ ...filter, user: e })}
          options={users.map((u) => ({ key: u._id, label: `${u.fullName} - ${u.code}` }))}
          label="Nhân sự"
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
        actionsInfo={{ onViewDetail: (item) => navigate(`/permissions/detail/${item._id}`), deleteApi: deletePermissionApi }}
        statusInfo={{ changeStatusApi: updatePermissionApi }}
        headerInfo={{ onCreate: () => navigate('/permissions/create') }}
      />
    </FormList>
  );
};

export default Permissions;
