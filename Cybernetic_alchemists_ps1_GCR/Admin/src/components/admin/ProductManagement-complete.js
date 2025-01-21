import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Tooltip,
  message,
  Upload,
  Image
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
  SearchOutlined,
  FilterOutlined,
  UploadOutlined,
  BarcodeOutlined,
  CameraOutlined,
  DownloadOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import BarcodeReader from 'react-barcode-reader';
import * as XLSX from 'xlsx';
import { Vision } from '@google-cloud/vision';

const styles = {
  productManagement: {
    padding: '24px',
  },
  barcodeModal: {
    textAlign: 'center',
  },
  barcodeScannerContainer: {
    margin: '20px 0',
    padding: '20px',
    border: '2px dashed #d9d9d9',
    borderRadius: '4px',
  },
  lensModal: {
    textAlign: 'center',
  },
  lensPreview: {
    maxWidth: '300px',
    margin: '20px auto',
  },
  languageSelector: {
    marginRight: '16px',
    minWidth: '120px',
  },
  categoryTag: {
    margin: '4px',
  },
  uploadDragger: {
    padding: '24px',
    background: '#fafafa',
    border: '1px dashed #d9d9d9',
    borderRadius: '2px',
    textAlign: 'center',
    margin: '16px 0',
  },
};

const { Option } = Select;

const ProductManagement = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isBarcodeModalVisible, setBarcodeModalVisible] = useState(false);
  const [isLensModalVisible, setLensModalVisible] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [categories] = useState(['Electronics', 'Clothing', 'Food', 'Books', 'Other']);

  useEffect(() => {
    // Load initial data
    const mockData = [
      {
        id: 1,
        name: 'Sample Product',
        category: 'Electronics',
        price: 99.99,
        stock: 50,
        status: 'active',
      }
    ];
    setData(mockData);
    setLoading(false);
  }, []);

  const downloadTemplate = () => {
    const template = [
      ['Product Name', 'Category', 'Price', 'Stock', 'Description', 'Status'],
      ['Example Product', 'Electronics', '99.99', '100', 'Product description', 'active']
    ];
    const ws = XLSX.utils.aoa_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'product_template.xlsx');
  };

  const handleBarcodeError = (err) => {
    console.error(err);
    message.error(t('message.error'));
  };

  const handleBarcodeSuccess = (result) => {
    setScanResult(result);
    form.setFieldsValue({ barcode: result });
    setBarcodeModalVisible(false);
    message.success(t('message.success'));
  };

  const handleImageUpload = async (file) => {
    try {
      setUploadedImage(file);
      // In a real implementation, you would send the image to Google Cloud Vision API
      // For demo purposes, we'll simulate a successful response
      setTimeout(() => {
        form.setFieldsValue({
          name: 'Detected Product',
          category: 'Electronics'
        });
        setIsLensModalVisible(false);
        message.success(t('message.success'));
      }, 1000);
      return false;
    } catch (error) {
      message.error(t('message.error'));
      return false;
    }
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  const autocategorize = (productName) => {
    const name = productName.toLowerCase();
    if (name.includes('phone') || name.includes('laptop')) return 'Electronics';
    if (name.includes('shirt') || name.includes('shoes')) return 'Clothing';
    if (name.includes('food') || name.includes('fruit')) return 'Food';
    if (name.includes('book')) return 'Books';
    return 'Other';
  };

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        const category = values.category || autocategorize(values.name);
        const newValues = { ...values, category };
        
        if (editingId) {
          setData(data.map(item => 
            item.id === editingId ? { ...item, ...newValues } : item
          ));
          message.success(t('message.success'));
        } else {
          setData([...data, { id: Date.now(), ...newValues }]);
          message.success(t('message.success'));
        }
        setVisible(false);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const columns = [
    {
      title: t('product.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('product.category'),
      dataIndex: 'category',
      key: 'category',
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      title: t('product.price'),
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: t('product.stock'),
      dataIndex: 'stock',
      key: 'stock',
      render: (text) => (
        <Tag color={text > 20 ? 'green' : text > 5 ? 'orange' : 'red'}>
          {text}
        </Tag>
      ),
    },
    {
      title: t('product.status'),
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Tag color={text === 'active' ? 'green' : 'red'}>
          {text.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: t('product.actions'),
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingId(record.id);
              form.setFieldsValue(record);
              setVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              Modal.confirm({
                title: t('product.delete'),
                content: t('message.confirm'),
                onOk() {
                  setData(data.filter(item => item.id !== record.id));
                  message.success(t('message.success'));
                },
              });
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={styles.productManagement}>
      <Card
        title={t('product.management')}
        extra={
          <Space>
            <Select
              style={styles.languageSelector}
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <Option value="en">English</Option>
              <Option value="es">Español</Option>
            </Select>
            <Button
              icon={<BarcodeOutlined />}
              onClick={() => setBarcodeModalVisible(true)}
            >
              {t('product.scan.barcode')}
            </Button>
            <Button
              icon={<CameraOutlined />}
              onClick={() => setIsLensModalVisible(true)}
            >
              {t('product.scan.lens')}
            </Button>
            <Button
              icon={<DownloadOutlined />}
              onClick={downloadTemplate}
            >
              {t('product.template.download')}
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingId(null);
                setVisible(true);
              }}
            >
              {t('product.add')}
            </Button>
          </Space>
        }
      >
        <Table
          loading={loading}
          dataSource={data}
          columns={columns}
          rowKey="id"
        />
      </Card>

      <Modal
        title={editingId ? t('product.edit') : t('product.add')}
        open={visible}
        onOk={handleSubmit}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label={t('product.name')}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label={t('product.category')}
          >
            <Select>
              {categories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label={t('product.price')}
            rules={[{ required: true }]}
          >
            <InputNumber
              min={0}
              precision={2}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="stock"
            label={t('product.stock')}
            rules={[{ required: true }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="barcode"
            label="Barcode"
          >
            <Input disabled={!scanResult} />
          </Form.Item>
          {/* New Fields to be added here */}
          <Form.Item
            name="description"
            label="Detailed Description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="keyFeatures"
            label="Key Features"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="benefits"
            label="Benefits"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="mrp"
            label="MRP"
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="sellingPrice"
            label="Selling Price"
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="discountPercentage"
            label="Discount Percentage"
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="taxDetails"
            label="Tax Details"
          >
            <Select>
              <Option value="gst">GST</Option>
              <Option value="vat">VAT</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="minimumOrderQuantity"
            label="Minimum Order Quantity"
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="restockingTime"
            label="Restocking Time"
          >
            <Select>
              <Option value="1 day">1 Day</Option>
              <Option value="1 week">1 Week</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="sizeWeight"
            label="Size/Weight"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="colorVariants"
            label="Color/Variants"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="materialType"
            label="Material Type"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sku"
            label="SKU"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="shippingDimensions"
            label="Shipping Dimensions (LxWxH)"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="weight"
            label="Weight"
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="shippingCharges"
            label="Shipping Charges"
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="productImages"
            label="Product Images"
          >
            <Upload multiple>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="certificationDocuments"
            label="Certification Documents"
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="ingredients"
            label="Ingredients/Composition"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="shelfLife"
            label="Shelf Life/Expiry Date"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="legalDisclaimer"
            label="Legal Disclaimer"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="metaTitle"
            label="Meta Title"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="metaDescription"
            label="Meta Description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="tags"
            label="Tags/Keywords"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="approvalStatus"
            label="Product Visibility Status"
          >
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="pending">Pending Approval</Option>
              <Option value="published">Published</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="approvalNotes"
            label="Approval Notes"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={t('product.scan.barcode')}
        open={isBarcodeModalVisible}
        onCancel={() => setBarcodeModalVisible(false)}
        footer={null}
        style={styles.barcodeModal}
      >
        <div className="barcode-scanner-container">
          <BarcodeReader
            onError={handleBarcodeError}
            onScan={handleBarcodeSuccess}
          />
          {scanResult && (
            <div>
              <p>Scanned Code: {scanResult}</p>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        title={t('product.scan.lens')}
        open={isLensModalVisible}
        onCancel={() => setIsLensModalVisible(false)}
        footer={null}
        style={styles.lensModal}
      >
        <Upload.Dragger
          beforeUpload={handleImageUpload}
          accept="image/*"
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <CameraOutlined />
          </p>
          <p className="ant-upload-text">
            {t('product.scan.lens')}
          </p>
        </Upload.Dragger>
        {uploadedImage && (
          <div className="lens-preview">
            <img
              src={URL.createObjectURL(uploadedImage)}
              alt="Preview"
              style={{ width: '100%' }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductManagement;
