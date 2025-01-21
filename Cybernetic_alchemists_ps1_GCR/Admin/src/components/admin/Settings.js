import React from 'react';
import { 
  Card, Form, Input, Button, Tabs, 
  Upload, message, Switch, Select,
  TimePicker, Radio 
} from 'antd';
import { UploadOutlined, ImportOutlined, ExportOutlined } from '@ant-design/icons';
import ScheduledMigrations from './ScheduledMigrations'; // Import the ScheduledMigrations component

const { TabPane } = Tabs;
const { Option } = Select;

const Settings = () => {
  const [businessForm] = Form.useForm();
  const [kycForm] = Form.useForm();
  const [preferencesForm] = Form.useForm();

  const handleBusinessSubmit = (values) => {
    console.log('Business details:', values);
    message.success('Business details updated successfully');
  };

  const handleKYCSubmit = (values) => {
    console.log('KYC details:', values);
    message.success('KYC documents uploaded successfully');
  };

  const handlePreferencesSubmit = (values) => {
    console.log('Preferences:', values);
    message.success('Preferences updated successfully');
  };

  return (
    <div className="settings">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Business Details" key="1">
          <Card>
            <Form
              form={businessForm}
              layout="vertical"
              onFinish={handleBusinessSubmit}
            >
              <Form.Item
                name="storeName"
                label="Store Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="address"
                label="Business Address"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Contact Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Business Email"
                rules={[{ required: true, type: 'email' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="logo"
                label="Store Logo"
              >
                <Upload maxCount={1}>
                  <Button icon={<UploadOutlined />}>Upload Logo</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab="KYC Documents" key="2">
          <Card>
            <Form
              form={kycForm}
              layout="vertical"
              onFinish={handleKYCSubmit}
            >
              <Form.Item
                name="gst"
                label="GST Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="pan"
                label="PAN Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="documents"
                label="Business Documents"
              >
                <Upload.Dragger multiple maxCount={5}>
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag documents to upload
                  </p>
                  <p className="ant-upload-hint">
                    Upload GST certificate, PAN card, and other relevant documents
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Documents
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane tab="Account Preferences" key="3">
          <Card>
            <Form
              form={preferencesForm}
              layout="vertical"
              onFinish={handlePreferencesSubmit}
            >
              <Form.Item
                name="notifications"
                label="Email Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="language"
                label="Language"
                initialValue="english"
              >
                <Select>
                  <Option value="english">English</Option>
                  <Option value="hindi">Hindi</Option>
                  <Option value="tamil">Tamil</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="timezone"
                label="Time Zone"
                initialValue="IST"
              >
                <Select>
                  <Option value="IST">Indian Standard Time</Option>
                  <Option value="GMT">GMT</Option>
                  <Option value="EST">EST</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="businessHours"
                label="Business Hours"
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>

              <Form.Item
                name="currency"
                label="Preferred Currency"
                initialValue="INR"
              >
                <Radio.Group>
                  <Radio value="INR">₹ INR</Radio>
                  <Radio value="USD">$ USD</Radio>
                  <Radio value="EUR">€ EUR</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Preferences
                </Button>
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
          <Card>
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
              <ScheduledMigrations /> {/* Integrate the ScheduledMigrations component */}
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Settings;
