import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, ConfigProvider, theme } from 'antd';

import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  BarChartOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './NewHeader';
import QuickActions from './QuickActions';
import './styles/admin.css';
import './styles/layout.css';

const { Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');
  const [breadcrumb, setBreadcrumb] = useState(['Dashboard']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/').filter(Boolean);
    const currentPage = path.length > 0 ? path[path.length - 1] : 'Dashboard';
    setBreadcrumb(['Dashboard', currentPage]);
    document.body.setAttribute('data-theme', theme);
  }, [location, theme]);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'add_product':
        navigate('/products');
        break;
      case 'new_order':
        navigate('/orders');
        break;
      case 'view_reports':
        navigate('/reports');
        break;
      case 'add_customer':
        navigate('/customers/new');
        break;
      case 'manage_customers':
        navigate('/customers');
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: 'Products',
    },
    {
      key: '/orders',
      icon: <ShoppingCartOutlined />,
      label: 'Orders',
    },
    {
      key: '/inventory',
      icon: <InboxOutlined />,
      label: 'Inventory',
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      key: '/support',
      icon: <CustomerServiceOutlined />,
      label: 'Support',
    },
     ];

  return (
    <ConfigProvider
    theme={{
      algorithm: theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: '#1890ff',
        borderRadius: 8,
      },
    }}
  >
  
      <Layout className="admin-layout theme-transition" data-theme={theme}>
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          theme={theme}
          className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}
        >
          <div className="logo">
            <img src="/gcr-logo.png" alt="Logo" />
          </div> 
          <Menu
            theme={theme}
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            className="nav-menu"
          />
        </Sider>
        <Layout>
          <Header 
            onToggle={handleToggle} 
            collapsed={collapsed} 
            theme={theme}
            onThemeToggle={toggleTheme}
          />
          <Content>
            <Breadcrumb className="page-breadcrumb">
              {breadcrumb.map((item, index) => (
                <Breadcrumb.Item key={index}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <div className="content-wrapper">
              {location.pathname === '/' && (
                <QuickActions onAction={handleQuickAction} />
              )}
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;
