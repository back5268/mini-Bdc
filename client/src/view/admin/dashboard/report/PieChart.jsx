import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Hủy', 'Đã thanh toán', 'Chờ thanh toán', 'Đã nhận hàng'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1
    }
  ]
};

const PieChart = () => {
  return (
    <div className="max-h-[400px] flex justify-center">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
