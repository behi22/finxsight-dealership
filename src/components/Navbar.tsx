import React from 'react';
import { Menu, Divider } from 'antd';
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  ShopOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  collapsed: boolean;
  onMenuClick: () => void; // Handler to close sidebar
}

const Navbar: React.FC<NavbarProps> = ({ collapsed, onMenuClick }) => {
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    if (key === 'home') {
      navigate('/home');
    } else if (key === 'settings') {
      navigate('/settings');
    } else if (key === 'user') {
      navigate('/user');
    } else if (key === 'sales') {
      navigate('/sales');
    } else if (key === 'inventory') {
      navigate('/inventory');
    }
    onMenuClick(); // Close sidebar when a link is clicked
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: !collapsed ? 'Dashboard Home' : null,
      onClick: () => handleMenuClick('home'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: !collapsed ? 'Settings' : null,
      onClick: () => handleMenuClick('settings'),
    },
  ];

  const otherItems = [
    {
      key: 'user',
      icon: <UserOutlined />,
      label: !collapsed ? 'User Management' : null,
      onClick: () => handleMenuClick('user'),
    },
    {
      key: 'inventory',
      icon: <AppstoreAddOutlined />,
      label: !collapsed ? 'Inventory Management' : null,
      onClick: () => handleMenuClick('inventory'),
    },
    {
      key: 'sales',
      icon: <ShopOutlined />,
      label: !collapsed ? 'Sales Management' : null,
      onClick: () => handleMenuClick('sales'),
    },
  ];

  return (
    <div
      style={{ width: collapsed ? 80 : 240, height: '100%' }}
      className="nav"
    >
      <h3 style={{ display: collapsed ? 'none' : 'block' }}>Menu</h3>
      <Divider
        style={{ display: collapsed ? 'none' : 'block' }}
        className="divider"
      />

      <Menu
        mode="inline"
        defaultSelectedKeys={[]}
        inlineCollapsed={collapsed}
        className="navMenu"
      >
        {menuItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={item.onClick}
            style={{ background: 'transparent', padding: 0, color: 'black' }}
          >
            {item.label}
          </Menu.Item>
        ))}
        <Divider className="divider" />
        {otherItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={item.onClick}
            style={{ background: 'transparent', padding: 0, color: 'black' }}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;
