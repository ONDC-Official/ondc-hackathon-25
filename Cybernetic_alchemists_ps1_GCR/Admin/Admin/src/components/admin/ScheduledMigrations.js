import React, { useState } from 'react';
import { Card, Form, Button, Select, TimePicker, message } from 'antd';
import { ScheduleOutlined } from '@ant-design/icons';

const { Option } = Select;

const ScheduledMigrations = () => {
  const [scheduleForm] = Form.useForm();
  const [frequency, setFrequency] = useState('daily');

  const handleScheduleSubmit = (values) => {
    console.log('Scheduled Migration:', values);
    message.success('Migration scheduled successfully');
  };

  return (
    <Card title={<span><ScheduleOutlined /> Schedule Migration</span>}>
      <Form
        form={scheduleForm}
        layout="vertical"
        onFinish={handleScheduleSubmit}
      >
        <Form.Item
          name="frequency"
          label="Frequency"
          initialValue={frequency}
        >
          <Select onChange={setFrequency}>
            <Option value="daily">Daily</Option>
            <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="time"
          label="Time"
          rules={[{ required: true }]}
        >
          <TimePicker format="HH:mm" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Schedule Migration
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ScheduledMigrations;
