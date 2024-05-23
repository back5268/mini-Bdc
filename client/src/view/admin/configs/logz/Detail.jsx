import React from 'react';
import { FormDetail } from '@components/base';
import { Inputz } from '@components/core';
import { logType } from '@constant';
import Editorz from '@components/core/Editorz';

const DetailLog = (props) => {
  const { open, setOpen, data } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};

  return (
    <FormDetail
      title="lịch sử gửi email"
      open={open}
      setOpen={() => {
        setOpen(false);
      }}
    >
      <div className="flex flex-wrap w-full">
        <Inputz label="Địa chỉ gửi" value={item.to} className="w-full md:w-full lg:w-6/12" />
        <Inputz label="Tiêu đề" value={item.subject} className="w-full md:w-full lg:w-6/12" />
        <Inputz label="Loại thông báo" value={logType.find(l => l.key === item.type)?.label} className="w-full md:w-full lg:w-6/12" />
        <Editorz id="content" label="Nội dung" data={item.content} />
      </div>
    </FormDetail>
  );
};

export default DetailLog;
