import { getListElectricWaterApi, getListMonthApi } from '@api';
import { Body, DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Dropdownz, Hrz, Imagez } from '@components/core';
import { electricWaterType } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useDataState } from '@store';
import React, { useState } from 'react';

const ElectricWaters = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListElectricWaterApi, params, 'electricWaters');
  const { data: months } = useGetApi(getListMonthApi, params, 'months');
  const { apartments } = useDataState();

  const columns = [
    { label: 'Căn hộ', body: (e) => e.apartment?.name },
    { label: 'Tháng', field: 'month' },
    { label: 'Loại', body: (e) => Body(electricWaterType, e.type) },
    { label: 'Chỉ số đầu', field: 'beforeNumber' },
    { label: 'Chỉ số cuối', field: 'afterNumber' },
    { label: 'Hình ảnh', body: (e) => <Imagez isZoom src={e.image} /> },
    {
      label: 'Người chốt',
      body: (e) => (
        <div className="flex flex-col gap-1">
          <span>{e.by?.fullName}</span>
          {TimeBody(e.dateUpdate)}
        </div>
      )
    },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Thời gian cập nhật', body: (e) => TimeBody(e.updatedAt) }
  ];

  return (
    <FormList title="Chỉ số điện nước">
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
      <Hrz />
      <DataTable isLoading={isLoading} data={data?.documents} total={data?.total} columns={columns} params={params} setParams={setParams} />
    </FormList>
  );
};

export default ElectricWaters;
