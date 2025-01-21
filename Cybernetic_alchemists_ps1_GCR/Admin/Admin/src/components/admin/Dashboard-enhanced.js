import React from 'react';
import { Card, Row, Col } from 'antd';
import InventoryOverview from './InventoryOverview'; // Importing the InventoryOverview component
import InventoryManagement from './InventoryManagement'; // Importing the InventoryManagement component

const DashboardEnhanced = ({ totalProducts, categorizedData }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Row gutter={16}>
        <Col span={24}>
          <Card>
            <InventoryOverview totalProducts={totalProducts} categorizedData={categorizedData} />
            <InventoryManagement /> {/* Render the InventoryManagement component */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardEnhanced;
