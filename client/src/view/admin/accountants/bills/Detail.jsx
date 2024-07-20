import React from 'react';
import { Buttonz, Chipz, Dialogz, Hrz } from '@components/core';
import { Body, DataTable, NumberBody, TimeBody } from '@components/base';
import { billStatus, serviceType } from '@constant';
import { detailBillApi } from '@api';
import { useGetApi } from '@lib/react-query';
import moment from 'moment';
import { formatNumber } from '@lib/helper';

const Header = ({ item = {} }) => {
  return (
    <div className="flex flex-wrap items-center justify-evenly text-center">
      <div className="w-full md:w-6/12 lg:w-3/12 my-2">
        <span className="font-medium">Căn hộ: {item?.apartment?.name}</span>
      </div>
      <div className="w-full md:w-6/12 lg:w-3/12 my-2">
        <span className="font-medium">Kỳ tháng: {item?.month}</span>
      </div>
      <div className="w-full md:w-6/12 lg:w-3/12 my-2">
        <span className="font-medium">Hạn thanh toán: {moment(item?.deadline).format('DD/MM/YYYY')}</span>
      </div>
      <div className="w-full md:w-6/12 lg:w-3/12 my-2">
        <span className="font-medium">Ngày duyệt: {item?.confirmDate ? moment(item?.confirmDate).format('DD/MM/YYYY') : '--/--/----'}</span>
      </div>
      <div className="w-full md:w-6/12 lg:w-3/12 my-2">
        <div className="w-full flex justify-center">{Body(billStatus, item?.status)}</div>
      </div>
      <div className="w-full md:w-6/12 lg:w-3/12 my-2">
        <span className="font-medium">
          Số tiền: <span className="text-red-600 text-xl font-semibold">{formatNumber(item?.amount)}</span>
        </span>
      </div>
      <div className="w-full md:w-6/12 lg:w-3/12 my-2">
        <span className="font-medium">
          Đã thanh toán: <span className="text-red-600 text-xl font-semibold">{formatNumber(item?.paid)}</span>
        </span>
      </div>
      <div className="w-full md:w-6/12 lg:w-3/12 my-2">
        <span className="font-medium">
          Còn nợ: <span className="text-red-600 text-xl font-semibold">{formatNumber(item?.amount - item?.paid)}</span>
        </span>
      </div>
    </div>
  );
};

const DetaiBill = (props) => {
  const { open, setOpen } = props;
  const { data: item } = useGetApi(detailBillApi, { _id: open }, 'bill', Boolean(open));

  const columns = [
    { label: 'Loại dịch vụ', body: (e) => Body(serviceType, e.serviceType) },
    { label: 'Dịch vụ', field: 'serviceName' },
    {
      label: 'Đơn giá',
      body: (e) => {
        const prices = e.prices;
        if (prices.length === 1 && prices[0].from === 0 && prices[0].to === 0) return formatNumber(prices[0]?.amount);
        else if (prices.length > 1)
          return (
            <div className="flex flex-col gap-2">
              {prices.map((p, index) => (
                <div key={index} className="flex justify-between gap-2">
                  <span>Từ: {p.from}</span>
                  <span>Đến: {p.to}</span>
                  <span>Giá: {formatNumber(p.amount)}</span>
                </div>
              ))}
            </div>
          );
        else return formatNumber(e.price);
      }
    },
    { label: 'Số lượng', body: (e) => NumberBody(e.quantity) },
    { label: 'Giảm trừ', body: (e) => NumberBody(e.discount) },
    { label: 'Thành tiền', body: (e) => NumberBody(e.summary) },
    { label: 'Ngày bắt đầu', body: (e) => TimeBody(e.fromDate, 'date') },
    { label: 'Ngày kết thúc', body: (e) => TimeBody(e.toDate, 'date') }
  ];

  return (
    <Dialogz className="w-[1200px]" title={`Chi tiết bảng kê ${item?.code}`} open={open} setOpen={setOpen}>
      <div className="w-full max-h-[600px] overflow-scroll mt-4">
        <Header item={item} />
        <div className="flex flex-col items-center justify-center ">
          <DataTable isPagination={false} data={item?.debits} columns={columns} hideParams={true} />
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
