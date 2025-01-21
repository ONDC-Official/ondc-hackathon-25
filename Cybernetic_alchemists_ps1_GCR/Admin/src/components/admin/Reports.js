import React from 'react';
import { Column } from '@ant-design/plots';

const Reports = () => {
  const data = [
    { month: 'Jan', sales: 3000 },
    { month: 'Feb', sales: 3500 },
    { month: 'Mar', sales: 4000 },
    { month: 'Apr', sales: 3800 },
    { month: 'May', sales: 4200 },
  ];

  const config = {
    data,
    xField: 'month',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      month: { alias: 'Month' },
      sales: { alias: 'Sales' },
    },
  };

  return (
    <div>
      <h1>Sales Reports</h1>
      <Column {...config} />
    </div>
  );
};

export default Reports;
