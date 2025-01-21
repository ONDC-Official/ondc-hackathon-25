import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './styles/customer-management.css';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => editCustomer(record)}
          />
          <Button 
            icon={<DeleteOutlined />} 
            danger 
            onClick={() => deleteCustomer(record.id)}
          />
        </>
      ),
    },
  ];

  const editCustomer = (customer) => {
    setSelectedCustomer(customer);
    form.setFieldsValue(customer);
    setIsModalVisible(true);
  };

  const deleteCustomer = (customerId) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
    message.success('Customer deleted successfully');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedCustomer) {
        setCustomers(customers.map(c => 
          c.id === selectedCustomer.id ? { ...c, ...values } : c
        ));
      } else {
        setCustomers([...customers, { id: Date.now(), ...values }]);
      }
      setIsModalVisible(false);
      form.resetFields();
      setSelectedCustomer(null);
      message.success('Customer saved successfully');
    } catch (error) {
      message.error('Please check the form fields');
    }
  };

  return (
    <div>
      <Button 
        type="primary" 
        icon={<UserOutlined />}
        onClick={() => {
          setSelectedCustomer(null);
          form.resetFields();
          setIsModalVisible(true);
        }}
      >
        Add Customer
      </Button>
      <Table 
        columns={columns} 
        dataSource={customers}
        rowKey="id"
      />
      <Modal
        title={selectedCustomer ? "Edit Customer" : "Add Customer"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedCustomer(null);
        }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Customer Name"
            rules={[{ required: true, message: 'Please input customer name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerManagement;
