import { getListNewsApi, sendNewsApi, updateNewsApi } from '@api';
import { DataTable, FormList, TimeBody, DataFilter } from '@components/base';
import { Chipz, Dropdownz, Hrz, Inputz } from '@components/core';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import DetailNews from './Detail';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useToastState } from '@store';

const News = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListNewsApi, params, 'news');
  const { showToast } = useToastState();
  const [loading, setLoading] = useState(false);

  const onSendNews = async (item) => {
    setLoading(true);
    const response = await sendNewsApi({ _id: item._id });
    if (response) {
      setLoading(false);
      showToast({ title: 'Gửi thông báo thành công', severity: 'success' });
      setParams((pre) => ({ ...pre, render: !pre.render }));
    }
  };

  const columns = [
    { label: 'Tiêu đề', field: 'subject' },
    {
      label: 'Hastag',
      body: (e) => (
        <div className="flex gap-1">
          {typeof e.hashtag === 'object' && e.hashtag?.map((item, index) => item && <Chipz key={index} className="text-center" value={item} />)}
        </div>
      )
    },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Thời gian cập nhật', body: (e) => TimeBody(e.updatedAt) }
  ];

  return (
    <FormList title="Danh sách tin tức">
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
        isLoading={isLoading || loading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id),
          moreActions: [
            {
              icon: PaperAirplaneIcon,
              onClick: (item) => onSendNews(item)
            }
          ]
        }}
        statusInfo={{ changeStatusApi: updateNewsApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      />
    </FormList>
  );
};

export default News;
