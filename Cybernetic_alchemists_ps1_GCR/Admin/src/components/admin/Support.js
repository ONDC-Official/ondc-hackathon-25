import React from 'react';
import { 
  Card, Collapse, Input, Button, 
  List, Avatar, Badge, Typography,
  Form, Alert
} from 'antd';
import { QuestionCircleOutlined, MessageOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Search } = Input;
const { Title, Paragraph } = Typography;

const Support = () => {
  const [messageForm] = Form.useForm();

  const faqs = [
    {
      question: 'How do I add new products?',
      answer: 'You can add new products from the Products page. Click on "Add Product" button and fill in the required details.'
    },
    {
      question: 'How do I process orders?',
      answer: 'Navigate to Orders page, find the order you want to process and click on "View Details". You can update the order status from there.'
    },
    {
      question: 'How can I update my inventory?',
      answer: 'Go to Inventory Management, find the product and click "Update Stock". You can also use bulk upload feature for multiple products.'
    },
    // Add more FAQs as needed
  ];

  const handleMessageSubmit = (values) => {
    console.log('Support message:', values);
    messageForm.resetFields();
  };

  return (
    <div className="support">
      <Card>
        <Title level={4}>Help Center</Title>
        <Search
          placeholder="Search for help topics..."
          style={{ marginBottom: 24 }}
        />

        <Collapse defaultActiveKey={['1']}>
          <Panel header="Frequently Asked Questions" key="1">
            <List
              itemLayout="vertical"
              dataSource={faqs}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<QuestionCircleOutlined />}
                    title={item.question}
                    description={item.answer}
                  />
                </List.Item>
              )}
            />
          </Panel>

          <Panel header="Video Tutorials" key="2">
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: 'Getting Started Guide', duration: '5:30' },
                { title: 'Managing Your Products', duration: '4:15' },
                { title: 'Processing Orders', duration: '6:45' },
              ]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<QuestionCircleOutlined />} />}
                    title={item.title}
                    description={`Duration: ${item.duration}`}
                  />
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <Title level={4}>Live Support</Title>
        <div style={{ marginBottom: 16 }}>
          <Badge status="processing" text="Support team is online" />
        </div>

        <Form
          form={messageForm}
          layout="vertical"
          onFinish={handleMessageSubmit}
        >
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<MessageOutlined />} htmlType="submit">
              Send Message
            </Button>
          </Form.Item>
        </Form>

        <Alert
          message="Response Time"
          description="We typically respond within 2 hours during business hours (9 AM - 6 PM IST)."
          type="info"
          showIcon
        />
      </Card>

      <Card style={{ marginTop: 16 }}>
        <Title level={4}>Submit Feedback</Title>
        <Paragraph>
          Help us improve! Share your experience and suggestions about our platform.
        </Paragraph>
        
        <Form layout="vertical">
          <Form.Item
            name="feedback"
            label="Your Feedback"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary">
              Submit Feedback
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Support;