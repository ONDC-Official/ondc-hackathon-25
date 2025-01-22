import React from 'react';
import { Card, Row, Col } from 'antd';
import {
  PlusOutlined,
  ShoppingCartOutlined,
  FileSearchOutlined,
  UserAddOutlined
} from '@ant-design/icons';

const QuickActions = ({ onAction }) => {
  const actions = [
    {
      title: 'Add Product',
      icon: <PlusOutlined />,
      action: 'add_product',
      color: '#1890ff'
    },
    {
      title: 'New Order',
      icon: <ShoppingCartOutlined />,
      action: 'new_order',
      color: '#52c41a'
    },
    {
      title: 'View Reports',
      icon: <FileSearchOutlined />,
      action: 'view_reports',
      color: '#722ed1'
    },
    {
      title: 'Add Customer',
      icon: <UserAddOutlined />,
      action: 'add_customer',
      color: '#fa8c16'
    },
    {
      title: 'Manage Customers',
      icon: <UserAddOutlined />,
      action: 'manage_customers',
      color: '#fa8c16'
    }
  ];

  return (
    <Row gutter={[16, 16]} className="quick-actions">
      {actions.map((action, index) => (
        <Col xs={12} sm={12} md={6} key={index}>
          <Card 
            hoverable 
            className="quick-action-card hover-scale"
            onClick={() => onAction(action.action)}
          >
            <div className="quick-action-content" style={{ color: action.color }}>
              {action.icon}
              <h3>{action.title}</h3>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default QuickActions;
