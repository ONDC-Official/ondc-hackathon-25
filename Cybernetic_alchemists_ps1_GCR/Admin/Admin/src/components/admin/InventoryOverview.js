import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { PieChart } from '@ant-design/charts';

const InventoryOverview = ({ totalProducts, categorizedData }) => {
  const chartData = Object.keys(categorizedData).map(key => ({
    type: key,
    value: categorizedData[key],
  }));

  return (
    <div>
      <h2>Inventory Overview</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Products" value={totalProducts} />
          </Card>
        </Col>
        <Col span={16}>
          <PieChart data={chartData} angleField='value' colorField='type' />
        </Col>
      </Row>
    </div>
  );
};

export default InventoryOverview;
