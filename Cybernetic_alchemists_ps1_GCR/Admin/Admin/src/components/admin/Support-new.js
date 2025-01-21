import React, { useState, useEffect } from 'react';
import {
  Card,
  Collapse,
  Input,
  Button,
  List,
  Avatar,
  Badge,
  Typography,
  Tabs,
  Form,
  Select,
  Empty,
  Spin,
  Tag,
  Alert,
  Tooltip,
  Space
} from 'antd';
import {
  MessageOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import './styles/support.css';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Support = () => {
  const [loading, setLoading] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setTickets([
        {
          id: 'TK-001',
          title: 'Payment issue',
          status: 'open',
          priority: 'high',
          created: '2023-08-10',
          description: 'Unable to process payment for order #12345',
        },
        {
          id: 'TK-002',
          title: 'Login problem',
          status: 'in-progress',
          priority: 'medium',
          created: '2023-08-09',
          description: 'Two-factor authentication not working',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to the login page and click on "Forgot Password". Follow the instructions sent to your email.',
    },
    {
      question: 'How do I track my order?',
      answer: 'You can track your order in the Orders section using your order number.',
    },
    {
      question: 'How do I update my billing information?',
      answer: 'Go to Settings > Billing and click on "Update Payment Method".',
    },
    {
      question: 'How do I contact customer support?',
      answer: 'You can create a support ticket, use live chat, or email us at support@example.com',
    },
  ];

  const handleNewTicket = (values) => {
    const newTicket = {
      id: "TK-" + (tickets.length + 1),
      ...values,
      status: 'open',
      created: new Date().toISOString().split('T')[0],
    };
    setTickets([newTicket, ...tickets]);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        { text: messageInput, type: 'user', time: new Date() },
      ]);
      setMessageInput('');
      // Simulate response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: 'Thank you for your message. An agent will respond shortly.',
            type: 'agent',
            time: new Date(),
          },
        ]);
      }, 1000);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'blue',
      'in-progress': 'orange',
      resolved: 'green',
      closed: 'red',
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'green',
    };
    return colors[priority] || 'blue';
  };

  const messageClass = (type) => 
    "message " + (type === 'user' ? 'user-message' : 'agent-message');

  return (
    <div className="support-page">
      <Title level={2}>Help & Support</Title>
      
      <Alert
        message="Need immediate assistance?"
        description="Our support team is available 24/7. Start a live chat or create a ticket."
        type="info"
        showIcon
        action={
          <Button 
            type="primary" 
            icon={<MessageOutlined />}
            onClick={() => setChatVisible(true)}
          >
            Start Live Chat
          </Button>
        }
        className="support-alert"
      />

      <Tabs defaultActiveKey="1" className="support-tabs">
        <TabPane
          tab={
            <span>
              <QuestionCircleOutlined />
              FAQs
            </span>
          }
          key="1"
        >
          <Card className="faq-card">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search FAQs..."
              className="search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Collapse className="faq-collapse">
              {faqs
                .filter((faq) =>
                  faq.question.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((faq, index) => (
                  <Panel header={faq.question} key={index}>
                    <Paragraph>{faq.answer}</Paragraph>
                  </Panel>
                ))}
            </Collapse>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <FileTextOutlined />
              Support Tickets
            </span>
          }
          key="2"
        >
          <Card className="tickets-card">
            <div className="tickets-header">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setActiveChat(true)}
              >
                Create Ticket
              </Button>
            </div>

            {loading ? (
              <div className="loading-container">
                <Spin size="large" />
              </div>
            ) : (
              <List
                className="tickets-list"
                itemLayout="horizontal"
                dataSource={tickets}
                renderItem={(ticket) => (
                  <List.Item
                    actions={[
                      <Button type="link">View Details</Button>,
                      <Button type="link">Update</Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={<FileTextOutlined />}
                          className="ticket-avatar"
                        />
                      }
                      title={
                        <Space>
                          {ticket.title}
                          <Tag color={getStatusColor(ticket.status)}>
                            {ticket.status.toUpperCase()}
                          </Tag>
                          <Tag color={getPriorityColor(ticket.priority)}>
                            {ticket.priority.toUpperCase()}
                          </Tag>
                        </Space>
                      }
                      description={
                        <>
                          <div>{ticket.description}</div>
                          <div className="ticket-meta">
                            ID: {ticket.id} | Created: {ticket.created}
                          </div>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <CustomerServiceOutlined />
              Live Chat
            </span>
          }
          key="3"
        >
          <Card className="chat-card">
            {activeChat ? (
              <>
                <div className="chat-messages">
                  {messages.length > 0 ? (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={messageClass(message.type)}
                      >
                        <div className="message-content">{message.text}</div>
                        <div className="message-time">
                          {message.time.toLocaleTimeString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <Empty
                      description="No messages yet"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  )}
                </div>
                <div className="chat-input">
                  <Input.TextArea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message here..."
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    onPressEnter={(e) => {
                      if (!e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    type="primary"
                    icon={<MessageOutlined />}
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </div>
              </>
            ) : (
              <div className="chat-start">
                <CustomerServiceOutlined className="chat-icon" />
                <Title level={4}>Start a Live Chat</Title>
                <Paragraph>
                  Connect with our support team instantly. We're here to help!
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  icon={<MessageOutlined />}
                  onClick={() => setActiveChat(true)}
                >
                  Start Chat
                </Button>
              </div>
            )}
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Support;