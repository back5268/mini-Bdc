import React, { useState } from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { Cardz, Hrz, Imagez, InputCalendarz } from '@components/core';
import DataFilter from '@components/base';

const Ticket = (props) => {
  const { image, amount, label } = props;

  return (
    <div className="">
      <div className="card flex gap-8 items-center justify-center">
        <Imagez src={image} className="w-12 h-12" />
        <div className="flex flex-col">
          <h2 className="font-bold text-2xl">{amount}</h2>
          <span className="font-medium text-sm">{label}</span>
        </div>
      </div>
    </div>
  );
};

const items = [
  { image: '/images/logo.png', amount: 10, label: 'Đơn hàng' },
  { image: '/images/logo.png', amount: 10, label: 'Đèn ngủ DIY' },
  { image: '/images/logo.png', amount: 10, label: 'Đèn ngủ 3D' },
  { image: '/images/logo.png', amount: 10, label: 'Tranh DIY' }
];

const Dashboard = () => {
  const [params, setParams] = useState({});
  const [filter, setFilter] = useState({});

  return (
    <Cardz className="flex flex-col px-2">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
        <InputCalendarz value={filter.fromDate} onChange={(e) => setFilter({ ...filter, fromDate: e })} label="Từ ngày" />
        <InputCalendarz value={filter.toDate} onChange={(e) => setFilter({ ...filter, toDate: e })} label="Đến ngày" />
      </DataFilter>
      <Hrz />
      <div className="flex p-4">
        {items?.map((item, index) => (
          <div key={index} className="lg:w-3/12 p-2">
            <Ticket image={item.image} amount={item.amount} label={item.label} />
          </div>
        ))}
      </div>
      <Hrz />
      <div className="px-4">
        <div className="flex items-center my-12">
          <div className="w-full lg:w-6/12">
            <LineChart />
          </div>
          <div className="w-full lg:w-6/12">
            <PieChart />
          </div>
        </div>
        <BarChart />
      </div>
    </Cardz>
  );
};

export default Dashboard;
