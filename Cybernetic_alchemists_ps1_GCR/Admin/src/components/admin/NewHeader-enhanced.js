import React, { useState } from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button, Input, Avatar, Dropdown, Badge, Tooltip, Select } from 'antd';
const { Option } = Select;
import { 
  SearchOutlined, 
  BellOutlined, 
  UserOutlined, 
  BulbOutlined,
  GlobalOutlined,
  QuestionCircleOutlined,
  MessageOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  CalendarOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import './styles/header.css';
import logo from '../../assets/gcr-logo.png';

const Header = ({ collapsed, onToggle, theme, onThemeToggle }) => {
  const { t, i18n } = useTranslation();
  const [searchVisible, setSearchVisible] = useState(false);

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

  const handleRecentActivitiesClick = () => {
    console.log('Recent Activities clicked');
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="header-logo" />
        </div>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          className="trigger-button"
        />
        <div className="search-container">
          {searchVisible ? (
            <Input
              placeholder={t('header.search')}
              prefix={<SearchOutlined />}
              className="search-input"
              onBlur={() => setSearchVisible(false)}
              autoFocus
            />
          ) : (
            <Button 
              type="text" 
              icon={<SearchOutlined />} 
              onClick={() => setSearchVisible(true)}
              className="search-button"
            />
          )}
        </div>
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

        <Tooltip title={t('header.calendar')}>
          <Button
            type="text"
            icon={<CalendarOutlined />}
            className="header-icon-button"
          />
        </Tooltip>

        <Tooltip title={t('header.help')}>
          <Button
            type="text"
            icon={<QuestionCircleOutlined />}
            className="header-icon-button"
          />
        </Tooltip>

        <Tooltip title={t('header.messages')}>
          <Badge count={3}>
            <Button
              type="text"
              icon={<MessageOutlined />}
              className="header-icon-button"
            />
          </Badge>
        </Tooltip>

        <Dropdown overlay={
          <Menu>
            <Menu.Item key="recent-activities" onClick={handleRecentActivitiesClick}>
              Recent Activities
            </Menu.Item>
            <Menu.Item key="notifications" onClick={handleNotificationClick}>
              Notifications
            </Menu.Item>
          </Menu>
        }>
          <Badge count={5}>
            <Button
              type="text"
              icon={<NotificationOutlined />}
              className="header-icon-button"
            />
          </Badge>
        </Dropdown>

        <Tooltip title={t('header.theme.toggle')}>
          <Button
            type="text"
            icon={<BulbOutlined />}
            onClick={onThemeToggle}
            className="header-icon-button"
          />
        </Tooltip>

        <Dropdown menu={profileMenu} trigger={['click']}>
          <Avatar icon={<UserOutlined />} className="user-avatar" />
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
