import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Avatar, Dropdown, Badge, Tooltip, Select } from 'antd';
import { 
  SearchOutlined, 
  BellOutlined, 
  UserOutlined, 
  BulbOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import './styles/header.css';
import logo from '../../assets/gcr-logo-header.png';

const { Option } = Select;

const Header = ({ collapsed, onToggle, theme, onThemeToggle }) => {
  const { t, i18n } = useTranslation();
  const profileMenu = {
    items: [
      { 
        key: 'profile', 
        label: t('header.profile'),
        icon: <UserSwitchOutlined />,
      },
      { 
        key: 'settings', 
        label: t('header.settings'),
        icon: <SettingOutlined />,
      },
      { type: 'divider' },
      { 
        key: 'logout', 
        label: t('header.logout'),
        icon: <LogoutOutlined />,
        danger: true
      }
    ]
  };

  const handleSearch = (value) => {
    console.log('Searching for:', value);
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <Button 
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="menu-toggle hover-lift"
        />
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="header-right">
          <Select 
            defaultValue="en"
            style={{ width: 100 }}
            onChange={(value) => i18n.changeLanguage(value)}
          >
            <Option value="en">English</Option>
            <Option value="es">Español</Option>
          </Select>
        <Input.Search
          placeholder={t('header.search')}
          className="search-input hover-lift"
          prefix={<SearchOutlined />}
          onSearch={handleSearch}
          allowClear
        />
        <Tooltip title="Notifications">
          <Badge count={5} dot>
            <Button
              type="text"
              icon={<BellOutlined />}
              onClick={handleNotificationClick}
              className="notification-btn hover-lift"
            />
          </Badge>
        </Tooltip>
        <Tooltip title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
          <Button
            type="text"
            icon={<BulbOutlined />}
            onClick={onThemeToggle}
            className="theme-switch hover-lift"
          />
        </Tooltip>
        <Dropdown 
          menu={profileMenu} 
          placement="bottomRight" 
          trigger={['click']}
          className="hover-lift"
        >
          <Avatar 
            className="user-avatar hover-scale" 
            icon={<UserOutlined />}
            style={{ 
              backgroundColor: theme === 'light' ? '#1890ff' : '#177ddc',
              cursor: 'pointer'
            }} 
          />
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;