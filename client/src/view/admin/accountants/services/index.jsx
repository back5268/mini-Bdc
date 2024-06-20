import { deleteServiceApi, getListServiceApi, getListServiceInfoApi, updateStatusServiceApi } from '@api';
import { Body, DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Chipz, Dropdownz, Hrz, Inputz } from '@components/core';
import { serviceType, statuses, vehicleType } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useDataState } from '@store';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Services = ({ apartment }) => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListServiceApi, { apartment, ...params }, 'services');
  const { apartments, setServices } = useDataState();

  const columns = [
    { label: 'Loại dịch vụ', body: (e) => Body(serviceType, e.type) },
    { label: 'Loại phương tiện', body: (e) => Body(vehicleType, e.vehicleType) },
    {
      label: 'Căn hộ áp dụng',
      body: (e) => {
        return (
          <div className="flex flex-wrap gap-2 w-full">
            {e.apartments?.map((a, index) => {
              const label = apartments?.find((u) => u._id === a)?.name;
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
    const response = await getListServiceInfoApi();
    if (response) {
      setServices(response);
    }
  };

  return (
    <FormList title={apartment ? '' : 'Danh sách dịch vụ'}>
      {!apartment && (
        <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="md:w-6/12">
          <Dropdownz value={filter.type} onChange={(e) => setFilter({ ...filter, type: e })} options={serviceType} label="Loại dịch vụ" />
          <Dropdownz
            value={filter.apartment}
            onChange={(e) => setFilter({ ...filter, apartment: e })}
            options={apartments}
            optionLabel="name"
            optionValue="_id"
            label="Căn hộ"
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
        baseActions={apartment ? ['create', 'detail'] : ['create', 'detail', 'delete']}
        actionsInfo={{ onViewDetail: (item) => navigate(`/services/detail/${item._id}`), deleteApi: deleteServiceApi }}
        statusInfo={{ changeStatusApi: apartment ? false : updateStatusServiceApi }}
        headerInfo={{
          onCreate: () => navigate('/services/create')
        }}
        onSuccess={onSuccess}
      />
    </FormList>
  );
};

export default Services;
