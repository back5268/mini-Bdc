import { Buttonz, Inputz } from '@components/core';
import { TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';

const Price = ({ price = {}, setPrices = () => {}, disabled, isView, index }) => {
  const onChange = (field, value) => {
    setPrices((pre) =>
      pre.map((p) => {
        if (p.key === price.key) p[field] = value;
        return p;
      })
    );
  };

  return (
    <div className="flex flex-wrap items-center">
      {isView && (
        <div className="w-full md:w-6/12 lg:w-2/12 p-2 flex justify-start">
          <label className="inline-block font-medium text-left mb-2">Mức {index + 1}</label>
        </div>
      )}
      <Inputz
        min="0"
        type="number"
        label="Từ (*)"
        value={price.from}
        onChange={(e) => onChange('from', e.target.value)}
        className="w-full md:w-6/12 lg:w-3/12"
      />
      <Inputz
        min="1"
        type="number"
        label="Đến (*)"
        value={price.to}
        onChange={(e) => onChange('to', e.target.value)}
        className="w-full md:w-6/12 lg:w-3/12"
      />
      <Inputz
        min="1"
        type="number"
        label="Giá tiền (*)"
        value={price.amount}
        onChange={(e) => onChange('amount', e.target.value)}
        className="w-full md:w-6/12 lg:w-3/12"
      />
      {!isView && (
        <div className="w-full md:w-6/12 lg:w-3/12 p-2 flex justify-center">
          <Buttonz
            onClick={() => setPrices((pre) => pre.filter((p) => p.key !== price.key))}
            variant="outlined"
            className="!px-3 !py-2"
            color="red"
            disabled={disabled}
          >
            <TrashIcon className="w-6" />
          </Buttonz>
        </div>
      )}
    </div>
  );
};

export default Price;
