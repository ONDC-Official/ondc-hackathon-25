import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Switch,
  Button,
  Tabs,
  Select,
  Upload,
  message,
  Space,
  Divider,
  Alert,
  Row,
  Col
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  BellOutlined,
  SecurityScanOutlined,
  GlobalOutlined,
  UploadOutlined,
  SaveOutlined,
  BulbOutlined,
  ImportOutlined,
  ExportOutlined
} from '@ant-design/icons';
import './styles/settings.css';

const { Option } = Select;
const { TabPane } = Tabs;

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('Settings saved successfully');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="settings-page">
      <Tabs defaultActiveKey="1" className="settings-tabs">
        <TabPane
          tab={
            <span>
              <UserOutlined />
              Profile
            </span>
          }
          key="1"
        >
          <Card className="settings-card">
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                name: 'John Doe',
                email: 'john.doe@example.com',
                language: 'en',
                timezone: 'UTC+0',
              }}
            >
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Profile Picture"
                    name="avatar"
                  >
                    <Upload
                      maxCount={1}
                      listType="picture-card"
                      showUploadList={false}
                      beforeUpload={() => false}
                    >
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>

                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Language"
                    name="language"
                  >
                    <Select>
                      <Option value="en">English</Option>
                      <Option value="es">Spanish</Option>
                      <Option value="fr">French</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Timezone"
                    name="timezone"
                  >
                    <Select>
                      <Option value="UTC+0">UTC+0 London</Option>
                      <Option value="UTC-5">UTC-5 New York</Option>
                      <Option value="UTC+1">UTC+1 Paris</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <BellOutlined />
              Notifications
            </span>
          }
          key="2"
        >
          <Card className="settings-card">
            <Form layout="vertical">
              <h3>Email Notifications</h3>
              <Form.Item
                label="Order Updates"
                name="orderNotifications"
                valuePropName="checked"
              >
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item
                label="Product Updates"
                name="productNotifications"
                valuePropName="checked"
              >
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item
                label="Newsletter"
                name="newsletter"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Divider />

              <h3>System Notifications</h3>
              <Form.Item
                label="Security Alerts"
                name="securityAlerts"
                valuePropName="checked"
              >
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item
                label="Login Notifications"
                name="loginNotifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <SecurityScanOutlined />
              Security
            </span>
          }
          key="3"
        >
          <Card className="settings-card">
            <Alert
              message="Security Recommendation"
              description="Enable two-factor authentication for enhanced account security."
              type="info"
              showIcon
              className="security-alert"
            />

            <Form layout="vertical">
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: 'Please enter current password' }]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[{ required: true, message: 'Please enter new password' }]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                label="Two-Factor Authentication"
                name="twoFactor"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <ImportOutlined />
              Migration
            </span>
          }
          key="4"
        >
          <Card className="settings-card">
            <h3>Data Migration</h3>
            <Form layout="vertical">
              <Form.Item label="Import Data">
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload File</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="Export Data">
                <Button icon={<ExportOutlined />}>Download Data</Button>
              </Form.Item>
              <Form.Item label="Connect to API">
                <Button type="primary">Connect</Button>
              </Form.Item>
              <Form.Item label="Field Mapping">
                <Button type="default">Map Fields</Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>

      <div className="settings-footer">
        <Space>
          <Button type="default" onClick={() => form.resetFields()}>
            Reset
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={loading}
          >
            Save Changes
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Settings;
