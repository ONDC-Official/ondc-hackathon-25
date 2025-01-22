import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Modal, message, Form, Input } from 'antd';
import { Pie } from '@ant-design/charts'; // Importing chart library
import * as XLSX from 'xlsx'; // Importing xlsx library
import CustomerManagement from './CustomerManagement'; // Importing CustomerManagement component

const InventoryManagementEnhanced = () => {
  const [inventory, setInventory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const response = await fetch('/inventory/list');
    const data = await response.json();
    if (data.success) {
      setInventory(data.products);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    await addProduct(values);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addProduct = async (product) => {
    const response = await fetch('/inventory/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    if (data.success) {
      message.success('Product added successfully');
      fetchInventory(); // Refresh inventory
    } else {
      message.error(data.message);
    }
  };

  const handleRestock = async (id) => {
    const newStockValue = 10; // Define the new stock value as needed
    const response = await fetch(`/inventory/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stock: newStockValue }), // Update with the new stock value
    });
    
    const data = await response.json();
    if (data.success) {
      message.success(`Product ${id} has been restocked.`);
      fetchInventory(); // Refresh inventory
    } else {
      message.error(data.message);
    }
  };

  const handleEdit = (product) => {
    form.setFieldsValue(product); // Pre-fill the form with the product's current details
    setEditingProduct(product);
    setIsModalVisible(true); // Show the modal for editing
  };

  const exportToCSV = () => {
    // Logic to export inventory to CSV
  };

  const exportToExcel = () => {
    // Logic to export inventory to Excel
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const importInventory = async () => {
    // Logic to read and parse the uploaded file
  };

  const totalProductsInStock = inventory.reduce((total, item) => total + (item.stock > 0 ? 1 : 0), 0);
  const categorizedData = inventory.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.stock;
    return acc;
  }, {});

  const chartData = Object.keys(categorizedData).map(key => ({
    type: key,
    value: categorizedData[key],
  }));

  const columns = [
    {
      title: 'Product ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
        <Tag color={stock > 0 ? 'green' : 'red'}>
          {stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => handleRestock(record.id)}>Restock</Button>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Inventory Management</h2>
      <Button type="primary" onClick={showModal}>
        Add Product
      </Button>
      <Button onClick={exportToCSV}>Export to CSV</Button>
      <Button onClick={exportToExcel}>Export to Excel</Button>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={importInventory}>Import Inventory</Button>
      <Modal title="Add Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="quantity" label="Stock Quantity" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={inventory} columns={columns} rowKey="id" />
      <Pie data={chartData} angleField='value' colorField='type' />
      <CustomerManagement /> {/* Adding Customer Management component here */}
    </div>
  );
};

export default InventoryManagementEnhanced;
