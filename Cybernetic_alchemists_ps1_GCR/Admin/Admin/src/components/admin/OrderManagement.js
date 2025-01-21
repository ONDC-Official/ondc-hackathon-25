import React, { useState, useEffect } from 'react';
import {
  Table, Tag, Space, Button, Modal,
  Card, Typography, Descriptions, message, Select
} from 'antd';
import { PrinterOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  // Sample order data
  useEffect(() => {
    setOrders([
      {
        id: 'ORD001',
        customer: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '+91-9876543210',
        address: '123, MG Road, Mumbai, Maharashtra',
        date: '2024-01-15',
        total: 299.99,
        status: 'pending',
        items: [
          { name: 'Product A', quantity: 2, price: 149.99 },
          { name: 'Product B', quantity: 1, price: 99.99 }
        ]
      },
      {
        id: 'ORD002',
        customer: 'Priya Gupta',
        email: 'priya.gupta@example.com',
        phone: '+91-9123456789',
        address: '456, Churchgate, Mumbai, Maharashtra',
        date: '2024-01-16',
        total: 199.99,
        status: 'shipped',
        items: [
          { name: 'Product C', quantity: 1, price: 199.99 }
        ]
      }
    ]);
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailsVisible(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    message.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handlePrint = (order) => {
    message.info(`Printing order ${order.id}`);
  };

  const handleDownload = (order) => {
    message.info(`Downloading order ${order.id}`);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Order Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total) => `₹${total.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Space>
          <Select
            defaultValue={status}
            onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
          >
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="shipped">Shipped</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="cancelled">Cancelled</Select.Option>
          </Select>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleViewDetails(record)}>
            View Details
          </Button>
          <Button type="primary" icon={<PrinterOutlined />} onClick={() => handlePrint(record)}>
            Print
          </Button>
          <Button icon={<DownloadOutlined />} onClick={() => handleDownload(record)}>
            Download
          </Button>
        </Space>
      ),
    },
  ];

  // Order summary statistics
  const orderSummary = {
    total: orders.length,
    pending: orders.filter(order => order.status === 'pending').length,
    shipped: orders.filter(order => order.status === 'shipped').length,
    completed: orders.filter(order => order.status === 'completed').length,
  };

  return (
    <Card
      title={<Title level={3}>Order Management</Title>}
      className="table-card"
    >
      <div>
        <h4>Order Summary</h4>
        <p>Total Orders: {orderSummary.total}</p>
        <p>Pending Orders: {orderSummary.pending}</p>
        <p>Shipped Orders: {orderSummary.shipped}</p>
        <p>Completed Orders: {orderSummary.completed}</p>
      </div>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        className="orders-table"
        scroll={{ x: 900 }}
        pagination={{
          responsive: true,
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20'],
        }}
      />
      {selectedOrder && (
        <Modal
          title={`Order Details - ${selectedOrder.id}`}
          open={detailsVisible}
          onCancel={() => setDetailsVisible(false)}
          footer={[
            <Button key="close" onClick={() => setDetailsVisible(false)}>
              Close
            </Button>
          ]}
        >
          <Descriptions bordered>
            <Descriptions.Item label="Customer" span={3}>{selectedOrder.customer}</Descriptions.Item>
            <Descriptions.Item label="Email" span={3}>{selectedOrder.email}</Descriptions.Item>
            <Descriptions.Item label="Phone" span={3}>{selectedOrder.phone}</Descriptions.Item>
            <Descriptions.Item label="Address" span={3}>{selectedOrder.address}</Descriptions.Item>
            <Descriptions.Item label="Date" span={3}>{selectedOrder.date}</Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
              <Tag color={
                selectedOrder.status === 'completed' ? 'green' :
                  selectedOrder.status === 'shipped' ? 'blue' :
                    selectedOrder.status === 'pending' ? 'orange' : 'default'
              }>
                {selectedOrder.status.toUpperCase()}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Total" span={3}>₹{selectedOrder.total.toFixed(2)}</Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
    </Card>
  );
};

export default OrderManagement;
