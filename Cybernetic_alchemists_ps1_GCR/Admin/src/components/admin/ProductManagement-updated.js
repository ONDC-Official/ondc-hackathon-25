import React, { useState, useEffect } from 'react';
import { Tabs, Tag } from 'antd';
import { 
  Table, 
  Button, 
  message, 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Upload, 
  DatePicker,
  Switch,
  Space,
  TreeSelect
} from 'antd';
import { 
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined
} from '@ant-design/icons';
import ReactQuill from 'react-quill';
import ProductForm from './ProductForm';
import ProductPreview from './ProductPreview';
import './styles/product-management.css';

const API_BASE_URL = 'http://localhost:5000/api';  // Add your backend URL here

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      message.error('Failed to fetch products: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const handleAddProduct = async (values) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Failed to add product');
      message.success('Product added successfully');
      setIsModalVisible(false);
      form.resetFields();
      fetchProducts();
    } catch (error) {
      message.error('Failed to add product: ' + error.message);
    }
  };

  // Update existing product
  const handleUpdateProduct = async (id, values) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Failed to update product');
      message.success('Product updated successfully');
      setIsModalVisible(false);
      setEditingProduct(null);
      form.resetFields();
      fetchProducts();
    } catch (error) {
      message.error('Failed to update product: ' + error.message);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete product');
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      message.error('Failed to delete product: ' + error.message);
    }
  };

  const showAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (record) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const handleModalOk = () => {
    form.validateFields()
      .then((values) => {
        if (editingProduct) {
          handleUpdateProduct(editingProduct.id, values);
        } else {
          handleAddProduct(values);
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Stock',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
    },
    {
      title: 'MRP',
      dataIndex: 'mrp',
      key: 'mrp',
    },
    {
      title: 'Selling Price',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'published' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              Modal.confirm({
                title: 'Are you sure you want to delete this product?',
                content: 'This action cannot be undone.',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                  handleDeleteProduct(record.id);
                },
              });
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="product-management">
      <div className="product-management-header">
        <h2>Product Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showAddModal}
        >
          Add New Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingProduct}
        >
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: 'Please input the brand!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select the category!' }]}
          >
            <TreeSelect
              treeData={[
                {
                  title: 'Groceries',
                  value: 'groceries',
                  children: [
                    {
                      title: 'Grains',
                      value: 'groceries/grains',
                      children: [
                        {
                          title: 'Rice',
                          value: 'groceries/grains/rice',
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="stockQuantity"
            label="Stock Quantity"
            rules={[{ required: true, message: 'Please input the stock quantity!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="mrp"
            label="MRP"
            rules={[{ required: true, message: 'Please input the MRP!' }]}
          >
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item
            name="sellingPrice"
            label="Selling Price"
            rules={[{ required: true, message: 'Please input the selling price!' }]}
          >
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select>
              <Select.Option value="draft">Draft</Select.Option>
              <Select.Option value="published">Published</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;