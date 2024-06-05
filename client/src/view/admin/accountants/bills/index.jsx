import { getListBillApi, getListMonthApi, updateStatusBillApi } from '@api';
import { Body, DataTable, FormList, NumberBody, TimeBody } from '@components/base';
import DataFilter from '@components/base/DataFilter';
import { Dropdownz, Hrz, InputCalendarz, Inputz } from '@components/core';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useState } from 'react';
import { billStatus } from '@constant';
import { useDataState, useToastState } from '@store';
import DetaiBill from './Detail';

const Billz = ({ type = 'bill' }) => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [select, setSelect] = useState([]);
  const [open, setOpen] = useState(false);
  const title = type === 'bill' ? 'bảng kê' : type === 'dataBrowses' ? 'duyệt số liệu' : 'gửi thông báo';
  const status = type === 'bill' ? [3, 4, 5] : type === 'dataBrowses' ? [1] : [2];
  const className = type === 'bill' ? 'md:w-full lg:w-6/12' : 'md:w-6/12 lg:w-9/12';
  const { isLoading, data } = useGetApi(getListBillApi, { ...params, status }, 'bills');
  const { data: months } = useGetApi(getListMonthApi, {}, 'months');
  const { apartments } = useDataState();
  const { showToast } = useToastState();

  const columns = [
    { label: 'Mã bảng kê', field: 'code' },
    { label: 'Tháng', field: 'month' },
    { label: 'Căn hộ', body: (e) => e.apartment?.name },
    { label: 'Chủ hộ', body: (e) => e.customerInfo?.name },
    { label: 'Số tiền', body: (e) => NumberBody(e.amount) },
    { label: 'Hạn thanh toán', body: (e) => TimeBody(e.deadline, 'date') },
    { label: 'Thời gian tạo', body: (e) => TimeBody(e.createdAt) },
    { label: 'Trạng thái', body: (e) => Body(billStatus, e.status) }
  ];

  const onUpdate = async (status) => {
    const response = await updateStatusBillApi({ _ids: select, status });
    if (response) {
      showToast({ title: 'Đổi trạng thái bảng kê thành công', severity: 'success' });
      setParams((pre) => ({ ...pre, render: !pre.render }));
    }
  };

  const billItems = [
    { label: 'Chuyển trạng thái chờ duyệt', onClick: () => onUpdate(1) },
    { label: 'Chuyển trạng thái chờ gửi', onClick: () => onUpdate(2) }
  ];

  const dataBrowsItems = [{ label: 'Duyệt số liệu', onClick: () => onUpdate(2) }];

  const notificationItems = [
    { label: 'Chuyển trạng thái chờ thanh toán', onClick: () => onUpdate(3) },
    { label: 'Gửi thông báo', onClick: () => onUpdate(3) }
  ];

  return (
    <FormList title={`Danh sách ${title}`}>
      <DetaiBill open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className={className}>
        <Inputz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo mã bảng kê"
        />
        <Dropdownz
          value={filter.apartment}
          onChange={(e) => setFilter({ ...filter, apartment: e })}
          options={apartments}
          optionLabel="name"
          optionValue="_id"
          label="Căn hộ"
        />
        <InputCalendarz value={filter.from} onChange={(e) => setFilter({ ...filter, from: e })} label="Từ ngày" />
        <InputCalendarz value={filter.to} onChange={(e) => setFilter({ ...filter, to: e })} label="Đến ngày" />
        <Dropdownz value={filter.month} onChange={(e) => setFilter({ ...filter, month: e })} options={months} label="Tháng" />
        {type === 'bill' && (
          <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={billStatus} label="Trạng thái" />
        )}
      </DataFilter>
      <Hrz />
      <DataTable
        title="bảng kê"
        select={select}
        setSelect={setSelect}
        isLoading={isLoading}
        data={data?.documents}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['detail']}
        headerInfo={{ items: type === 'bill' ? billItems : type === 'dataBrowses' ? dataBrowsItems : notificationItems }}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id)
        }}
      />
    </FormList>
  );
};

export default Billz;
