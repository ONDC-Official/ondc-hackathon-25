import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import OrderManagement from './OrderManagement'; // Import the updated OrderManagement component

const DashboardNew = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Orders" value={1128} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Revenue" value={9342} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Pending Orders" value={29} />
          </Card>
        </Col>
      </Row>
      <OrderManagement /> {/* Integrate the OrderManagement component */}
    </div>
  );
};

export default DashboardNew;
