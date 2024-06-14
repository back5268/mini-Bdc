import { getListOptionApi } from '@api';
import { Body, DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Dropdownz, Hrz, Inputz } from '@components/core';
import { optionStatus, optionType } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import DetailOption from './Detail';
import { useDataState } from '@store';

const Options = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListOptionApi, params, 'options');
  const { apartments } = useDataState();

  const columns = [
    { label: 'Căn hộ', body: (e) => Body(apartments, e.apartment, '_id', 'name') },
    { label: 'Danh mục', body: (e) => Body(optionType, e.type) },
    { label: 'Tiêu đề', field: 'subject' },
    { label: 'Nội dung', field: 'content' },
    {
      label: 'Người viết',
      body: (e) => (
        <div className="flex flex-col gap-2 text-center">
          <span>{e.by?.fullName}</span>
          <span>{TimeBody(e.createdAt)}</span>
        </div>
      )
    },
    { label: 'Trạng thái', body: (e) => Body(optionStatus, e.status) }
  ];

  return (
    <FormList title="Danh sách ý kiến cư dân">
      <DetailOption open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} apartments={apartments} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-full">
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tiêu đề"
        />
        <Dropdownz
          value={filter.apartment}
          onChange={(e) => setFilter({ ...filter, apartment: e })}
          options={apartments}
          optionLabel="name"
          optionValue="_id"
          label="Căn hộ"
        />
        <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={optionType} label="Loại ý kiến" />
        <Dropdownz value={filter.type} onChange={(e) => setFilter({ ...filter, type: e })} options={optionStatus} label="Trạng thái" />
      </DataFilter>
      <Hrz />
      <DataTable
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id)
        }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      />
    </FormList>
  );
};

export default Options;
