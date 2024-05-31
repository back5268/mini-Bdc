import { deleteServiceApi, getListServiceApi, updateServiceApi } from '@api';
import { Body, DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { serviceType, statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListServiceApi, params, 'services');

  const columns = [
    { label: 'Tên dịch vụ', field: 'name' },
    { label: 'Mã dịch vụ', field: 'code' },
    { label: 'Loại dịch vụ', body: (e) => Body(serviceType, e.type) },
    { label: 'Bảng giá', body: (e) => e.price?.name },
    { label: 'Căn hộ áp dụng', body: (e) => Body(serviceType, e.type) },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Thời gian cập nhật', body: (e) => TimeBody(e.updatedAt) }
  ];

  return (
    <FormList title="Danh sách dịch vụ">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="md:w-6/12">
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên, mã dịch vụ"
        />
        <Dropdownz value={filter.type} onChange={(e) => setFilter({ ...filter, type: e })} options={serviceType} label="Loại dịch vụ" />
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
        actionsInfo={{ onViewDetail: (item) => navigate(`/services/detail/${item._id}`), deleteApi: deleteServiceApi }}
        statusInfo={{ changeStatusApi: updateServiceApi }}
        headerInfo={{
          onCreate: () => navigate('/services/create')
        }}
      />
    </FormList>
  );
};

export default Services;
