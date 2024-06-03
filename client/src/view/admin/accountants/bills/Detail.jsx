import React from 'react';
import { Buttonz, Chipz, Dialogz, Hrz } from '@components/core';
import { Body, DataTable, TimeBody } from '@components/base';
import { serviceType } from '@constant';

const DetaiBill = (props) => {
  const { open, setOpen, data = [] } = props;
  const item = data.find((d) => d._id === open);

  const columns = [
    { label: 'Loại dịch vụ', body: (e) => Body(serviceType, e.serviceInfo?.serviceType) },
    { label: 'Dịch vụ', body: (e) => e.serviceInfo?.name },
    { label: 'Ngày bắt đầu', body: (e) => TimeBody(e.from, 'date') },
    { label: 'Ngày kết thúc', body: (e) => TimeBody(e.to, 'date') },
    { label: 'Trạng thái', body: (e) => (e.status === 0 ? <Chipz color="red" value="Thất bại" /> : <Chipz value="Thành công" />) },
    { label: 'Lỗi', field: 'mess' }
  ];

  return (
    <Dialogz className="w-[1200px]" title={item?.title} open={open} setOpen={setOpen}>
      <div className="w-full max-h-[500px] overflow-scroll mt-4">
        <div className="flex flex-col gap-2">
          <span className='font-medium'>Thành công: {item?.success || 0}</span>
          <span className='font-medium'>Thất bại: {item?.error || 0}</span>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <DataTable isPagination={false} data={item?.detail} columns={columns} hideParams={true} />
        </div>
      </div>
      <Hrz className="my-4" />
      <div className="flex gap-4 justify-end">
        <Buttonz variant="outlined" color="red" label="Hủy" onClick={() => setOpen(false)} />
      </div>
    </Dialogz>
  );
};

export default DetaiBill;
