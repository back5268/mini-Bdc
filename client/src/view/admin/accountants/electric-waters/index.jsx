import { deleteElectricWaterApi, getListElectricWaterApi, getListMonthApi } from '@api';
import { Body, DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Dropdownz, Hrz, Imagez } from '@components/core';
import { electricWaterType } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useDataState } from '@store';
import React, { useState } from 'react';
import DetailElectricWater from './Detail';

const ElectricWaters = ({ apartment }) => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListElectricWaterApi, { apartment, ...params }, 'electricWaters');
  const { data: months } = useGetApi(getListMonthApi, params, 'months');
  const { apartments } = useDataState();
  const [open, setOpen] = useState(false);

  const columns = [
    { label: 'Căn hộ', body: (e) => Body(apartments, e.apartment, '_id', 'name') },
    { label: 'Tháng', field: 'month' },
    { label: 'Loại', body: (e) => Body(electricWaterType, e.type) },
    { label: 'Chỉ số đầu', field: 'beforeNumber' },
    { label: 'Chỉ số cuối', field: 'afterNumber' },
    {
      label: 'Hình ảnh',
      body: (e) => (
        <div className="flex justify-center">
          <Imagez className="w-32 h-32" isZoom src={e.image} />
        </div>
      )
    },
    {
      label: 'Người chốt',
      body: (e) => (
        <div className="flex flex-col gap-1 justify-center text-center">
          <span>{e.by?.fullName}</span>
          {TimeBody(e.dateUpdate)}
        </div>
      )
    }
  ];

  return (
    <FormList title={apartment ? '' : 'Chỉ số điện nước'}>
      <DetailElectricWater open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} months={months} />
      {!apartment && (
        <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="md:w-6/12">
          <Dropdownz value={filter.type} onChange={(e) => setFilter({ ...filter, type: e })} options={electricWaterType} label="Loại" />
          <Dropdownz
            value={filter.apartment}
            onChange={(e) => setFilter({ ...filter, apartment: e })}
            options={apartments}
            optionLabel="name"
            optionValue="_id"
            label="Căn hộ"
          />
          <Dropdownz value={filter.month} onChange={(e) => setFilter({ ...filter, month: e })} options={months} label="Tháng" />
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
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id),
          deleteApi: deleteElectricWaterApi
        }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      />
    </FormList>
  );
};

export default ElectricWaters;
