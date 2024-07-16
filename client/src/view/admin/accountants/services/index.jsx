import { deleteServiceApi, getListServiceApi, getListServiceInfoApi, updateStatusServiceApi } from '@api';
import { Body, DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Chipz, Dropdownz, Hrz, Inputz } from '@components/core';
import { serviceType, statuses, vehicleType } from '@constant';
import { useGetParams } from '@hook';
import { formatNumber } from '@lib/helper';
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
      label: 'Giá tiền',
      body: (e) => {
        const prices = e.prices;
        if (prices.length === 1) return <span className='font-medium uppercase'>Đơn giá: {formatNumber(prices[0]?.amount)}</span>;
        else
          return (
            <div className="flex flex-col gap-2">
              <span className='font-medium uppercase'>Lũy tiến:</span>
              <Hrz/>
              {prices.map((p, index) => (
                <div key={index} className="flex justify-between font-medium">
                  <span>Từ: {p.from}</span>
                  <span>Đến: {p.to}</span>
                  <span>Giá: {formatNumber(p.amount)}</span>
                </div>
              ))}
            </div>
          );
      }
    },
    {
      label: 'Căn hộ áp dụng',
      body: (e) => {
        return (
          <div className="flex flex-wrap gap-2 w-full">
            {e.apartments?.map((a, index) => {
              const label = apartments?.find((u) => u._id === a)?.name;
              return label && <Chipz key={index} value={label} className="text-center" />;
            })}
          </div>
        );
      }
    },
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
        columns={Boolean(apartment) ? columns.filter(c => c.label !== "Căn hộ áp dụng") : columns}
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
