import React, { useState } from 'react';
import { Card, Avatar, Typography, Descriptions, Space, Button, Form, Input, Modal, Upload, message, Row, Col, Statistic } from 'antd';
import { UserOutlined, ShopOutlined, IdcardOutlined, EditOutlined, MailOutlined, PhoneOutlined, UploadOutlined, 
  ShoppingOutlined, StarOutlined, TeamOutlined, DollarOutlined } from '@ant-design/icons';
import './styles/user-profile.css';

const { Title } = Typography;

const UserProfile = ({ 
  userName = "Gaurav Mishra",
  shopName = "My Shop",
  shopId = "SHOP123",
  profilePic = null,
  email = "gaurav@example.com",
  phone = "+91 9876543210"
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(profilePic);

  const handleEdit = () => {
    form.setFieldsValue({
      userName,
      shopName,
      email,
      phone
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      // Here you would typically make an API call to update the profile
      message.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.url);
      message.success('Profile picture uploaded successfully');
    } else if (info.file.status === 'error') {
      message.error('Failed to upload profile picture');
    }
  };
  const statistics = [
    {
      title: 'Total Sales',
      value: '₹458,623',
      icon: <DollarOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      color: '#f6ffed',
    },
    {
      title: 'Total Orders',
      value: '1,284',
      icon: <ShoppingOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      color: '#e6f7ff',
    },
    {
      title: 'Customer Rating',
      value: '4.8/5',
      icon: <StarOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
      color: '#fffbe6',
    },
    {
      title: 'Active Customers',
      value: '326',
      icon: <TeamOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
      color: '#f9f0ff',
    },
  ];

  return (
    <div className="user-profile-container">
      <Row gutter={[16, 16]} className="statistics-row">
        {statistics.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card className="statistic-card" style={{ background: stat.color }}>
              <div className="statistic-icon">{stat.icon}</div>
              <Statistic title={stat.title} value={stat.value} />
            </Card>
          </Col>
        ))}
      </Row>
      <Card className="user-profile-card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Upload
              name="avatar"
              showUploadList={false}
              action="/api/upload"
              onChange={handleImageUpload}
            >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Avatar 
                  size={100} 
                  src={imageUrl}
                  icon={!imageUrl && <UserOutlined />}
                />
                <Button 
                  type="primary" 
                  shape="circle" 
                  icon={<UploadOutlined />} 
                  size="small"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0
                  }}
                />
              </div>
            </Upload>
            <Title level={3} style={{ marginTop: 16, marginBottom: 0 }}>{userName}</Title>
          </div>
          
          {!isEditing ? (
            <>
              <Descriptions bordered column={1}>
                <Descriptions.Item label={<><ShopOutlined /> Shop Name</>}>
                  {shopName}
                </Descriptions.Item>
                <Descriptions.Item label={<><IdcardOutlined /> Shop ID</>}>
                  {shopId}
                </Descriptions.Item>
                <Descriptions.Item label={<><MailOutlined /> Email</>}>
                  {email}
                </Descriptions.Item>
                <Descriptions.Item label={<><PhoneOutlined /> Phone</>}>
                  {phone}
                </Descriptions.Item>
              </Descriptions>
              <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                Edit Profile
              </Button>
            </>
          ) : null}
        </Space>
      </Card>

      <Modal
        title="Edit Profile"
        visible={isEditing}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            userName,
            shopName,
            email,
            phone
          }}
        >
          <Form.Item
            name="userName"
            label="Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="shopName"
            label="Shop Name"
            rules={[{ required: true, message: 'Please input your shop name!' }]}
          >
            <Input prefix={<ShopOutlined />} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { pattern: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, 
                message: 'Please enter a valid Indian phone number!' }
            ]}
          >
            <Input prefix={<PhoneOutlined />} addonBefore="+91" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;