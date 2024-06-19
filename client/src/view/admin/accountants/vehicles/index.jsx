import { deleteVehicleApi, getListVehicleApi, updateVehicleApi } from '@api';
import { Body, DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses, vehicleType } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useDataState } from '@store';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Vehicles = ({ apartment }) => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListVehicleApi, { apartment, ...params }, 'vehicles');
  const { apartments } = useDataState();

  const columns = [
    { label: 'Tên phương tiện', field: 'name' },
    { label: 'Biển số xe', field: 'licensePlate' },
    { label: 'Căn hộ', body: (e) => e.apartment?.name },
    { label: 'Loại phương tiện', body: (e) => Body(vehicleType, e.type) },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Thời gian cập nhật', body: (e) => TimeBody(e.updatedAt) }
  ];

  return (
    <FormList title={apartment ? "" : "Danh sách phương tiện"}>
      {!apartment && (
        <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="!w-full">
          <Inputz
            value={filter.keySearch}
            onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
            label="Tìm kiếm theo tên, biển số xe"
          />
          <Dropdownz
            value={filter.apartment}
            onChange={(e) => setFilter({ ...filter, apartment: e })}
            options={apartments}
            optionLabel="name"
            optionValue="_id"
            label="Căn hộ"
          />
          <Dropdownz
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e })}
            options={vehicleType}
            label="Loại phương tiện"
          />
          <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={statuses} label="Trạng thái" />
        </DataFilter>
      )}
      <Hrz />
      <DataTable
        hideParams={Boolean(apartment)}
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        actionsInfo={{ onViewDetail: (item) => navigate(`/vehicles/detail/${item._id}`), deleteApi: deleteVehicleApi }}
        statusInfo={{ changeStatusApi: updateVehicleApi }}
        headerInfo={{
          onCreate: () => navigate('/vehicles/create')
        }}
      />
    </FormList>
  );
};

export default Vehicles;
