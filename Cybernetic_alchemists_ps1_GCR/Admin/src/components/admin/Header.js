import React, { useState } from 'react';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import './styles/header.css';
import logo from 'gcr-logo-header.png';

const Header = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New order received' },
    { id: 2, message: 'Catalog update pending' }
  ]);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <img src="/gcr-logo-header.png" alt="GCR Logo" className="logo" />
      </div>
      
      <div className="header-center">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search products, categories, or orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="header-right">
        <div className="notifications">
          <FaBell className="notification-icon" />
          <span className="notification-badge">
            {notifications.length}
          </span>
          <div className="notification-dropdown">
            {notifications.map(notification => (
              <div key={notification.id} className="notification-item">
                {notification.message}
              </div>
            ))}
          </div>
        </div>

        <div className="profile-menu">
          <button onClick={toggleProfileMenu} className="profile-button">
            <FaUser />
          </button>
          {isProfileMenuOpen && (
            <div className="profile-dropdown">
              <a href="/settings">Settings</a>
              <a href="/support">Support</a>
              <a href="/logout">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;