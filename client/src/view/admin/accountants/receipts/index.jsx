import { cancelReceiptApi, getListReceiptApi, renderReceiptApi, sendReceiptApi } from '@api';
import { Body, DataFilter, DataTable, FormList, NumberBody, TimeBody } from '@components/base';
import { Dropdownz, Hrz } from '@components/core';
import { paymentType, receiptType, statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import { useConfirmState, useDataState, useToastState } from '@store';
import React, { useState } from 'react';
import DetailReceipt from './Detail';

const Receipts = () => {
  const initParams = useGetParams();
  const { showConfirm } = useConfirmState();
  const { showToast } = useToastState();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListReceiptApi, params, 'receipts');
  const { apartments, residents } = useDataState();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(false);

  const columns = [
    { label: 'Căn hộ', body: (e) => e.apartment?.name },
    { label: 'Số tiền', body: (e) => NumberBody(e.amount) },
    { label: 'Loại phiếu', body: (e) => Body(receiptType, e.type) },
    { label: 'Loại thanh toán', body: (e) => Body(paymentType, e.paymentType) },
    { label: 'Ghi chú', field: 'note' },
    {
      label: 'Người tạo',
      body: (e) => (
        <div className="flex flex-col gap-1 items-center">
          <span>{e.payer?.fullName}</span>
          {TimeBody(e.createdAt)}
        </div>
      )
    }
  ];

  const onDelete = async (item) => {
    showConfirm({
      title: 'Bạn có chắc chắn muốn hủy phiếu này!',
      action: async () => {
        const response = await cancelReceiptApi({ _id: item._id });
        if (response) showToast({ title: 'Hủy phiếu thành công!', severity: 'success' });
        setParams((pre) => ({ ...pre, render: !pre.render }));
      }
    });
  };

  const onSendReceipt = async (item) => {
    const response = await sendReceiptApi({ _ids: item._id });
    if (response) {
      showToast({ title: 'Gửi thông báo thành công', severity: 'success' });
      setParams((pre) => ({ ...pre, render: !pre.render }));
    }
  };

  const onRenderReceipt = async (item) => {
    const response = await renderReceiptApi({ _id: item._id });
    if (response) {
      window.open(`/print/${item._id}?type=receipt`, '_blank');
    }
  };

  const onOpen = (type, item) => {
    setType(type);
    setOpen(item || true);
  };

  return (
    <FormList title="Danh sách phiếu">
      <DetailReceipt open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} type={type} apartments={apartments} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="md:w-6/12 lg:w-9/12">
        <Dropdownz
          value={filter.apartment}
          onChange={(e) => setFilter({ ...filter, apartment: e })}
          options={apartments}
          optionLabel="name"
          optionValue="_id"
          label="Căn hộ"
        />
        <Dropdownz
          value={filter.payer}
          onChange={(e) => setFilter({ ...filter, payer: e })}
          options={residents}
          optionLabel="fullName"
          optionValue="_id"
          label="Người tạo"
        />
        <Dropdownz value={filter.type} onChange={(e) => setFilter({ ...filter, type: e })} options={receiptType} label="Loại phiếu" />
        <Dropdownz
          value={filter.paymentType}
          onChange={(e) => setFilter({ ...filter, paymentType: e })}
          options={paymentType}
          label="Loại thanh toán"
        />
        <Dropdownz value={filter.status} onChange={(e) => setFilter({ ...filter, status: e })} options={statuses} label="Trạng thái" />
      </DataFilter>
      <Hrz />
      <DataTable
        isLoading={isLoading}
        data={data?.documents?.map((d) => ({ ...d, className: d.status === 0 ? '!bg-red' : '' }))}
        total={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['delete']}
        actionsInfo={{
          onDelete,
          onViewDetail: (e) => onOpen(e.type, e)
          // moreActions: [
          //   {
          //     icon: PrinterIcon,
          //     onClick: (item) => onRenderReceipt(item)
          //   },
          //   {
          //     icon: PaperAirplaneIcon,
          //     onClick: (item) => onSendReceipt(item)
          //   }
          // ]
        }}
        headerInfo={{
          moreHeader: [
            { children: () => 'Lập phiếu thu', onClick: () => onOpen(1) },
            { children: () => 'Lập phiếu hoàn tiền', onClick: () => onOpen(2) },
            { children: () => 'Lập phiếu hạch toán', onClick: () => onOpen(3) }
          ]
        }}
      />
    </FormList>
  );
};

export default Receipts;
