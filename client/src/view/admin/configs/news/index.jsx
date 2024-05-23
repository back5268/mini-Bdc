import { getListNewsApi, updateNewsApi } from '@api';
import { DataTable, FormList, NumberBody, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Chipz, Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import DetailNews from './Detail';

const News = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListNewsApi, params, 'news');

  const columns = [
    { label: 'Tiêu đề', field: 'title' },
    {
      label: 'Hastag',
      body: (e) => (
        <div className="flex gap-1">
          {e?.hashtag?.map((item, index) => (
            <Chipz key={index} className="text-center" value={item} />
          ))}
        </div>
      )
    },
    { label: 'Thời gian đọc (phút)', body: (item) => NumberBody(item.time) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  return (
    <FormList title="Danh sách mẫu thông báo">
      <DetailNews open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tiêu đề"
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
        baseActions={['create', 'detail']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id)
        }}
        statusInfo={{ changeStatusApi: updateNewsApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      />
    </FormList>
  );
};

export default News;
