import { deletePriceApi, getListPriceApi, updatePriceApi } from '@api';
import { Body, DataTable, FormList, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { priceType, serviceType, statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Prices = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListPriceApi, params, 'prices');

  const columns = [
    { label: 'Tên bảng giá', field: 'name' },
    { label: 'Mã bảng giá', field: 'code' },
    { label: 'Loại bảng giá', body: e => Body(priceType, e.recipe) },
    { label: 'Loại dịch vụ', body: e => Body(serviceType, e.serviceType) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  return (
    <FormList title="Danh sách bảng giá">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="!w-full">
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên, mã bảng giá"
        />
        <Dropdownz value={filter.recipe} onChange={(e) => setFilter({ ...filter, recipe: e })} options={priceType} label="Loại bảng giá" />
        <Dropdownz
          value={filter.serviceType}
          onChange={(e) => setFilter({ ...filter, serviceType: e })}
          options={serviceType}
          label="Loại dịch vụ"
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
        actionsInfo={{ onViewDetail: (item) => navigate(`/prices/detail/${item._id}`), deleteApi: deletePriceApi }}
        statusInfo={{ changeStatusApi: updatePriceApi }}
        headerInfo={{
          onCreate: () => navigate('/prices/create')
        }}
      />
    </FormList>
  );
};

export default Prices;
