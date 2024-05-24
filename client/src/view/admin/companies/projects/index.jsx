import { deleteProjectApi, getListProjectApi, updateProjectApi } from '@api';
import { DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListProjectApi, params, 'projects');

  const columns = [
    { label: 'Tên dự án', field: 'name' },
    { label: 'Mã dự án', field: 'code' },
    { label: 'Email', field: 'email' },
    { label: 'Số điện thoại', field: 'phone' },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  return (
    <FormList title="Danh sách dự án">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="md:w-6/12">
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên, mã dự án"
        />
        <Inputz
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
          label="Tìm kiếm theo email, số điện thoại"
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
        actionsInfo={{ onViewDetail: (item) => navigate(`/projects/detail/${item._id}`), deleteApi: deleteProjectApi }}
        statusInfo={{ changeStatusApi: updateProjectApi }}
        headerInfo={{
          onCreate: () => navigate('/projects/create')
        }}
      />
    </FormList>
  );
};

export default Projects;
