



import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { FaClipboard } from 'react-icons/fa';
import { FaClipboardCheck } from 'react-icons/fa';
import { BiClipboard } from 'react-icons/bi';
import { FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import '../App.css';
import './Sidebar.css';


const { Sider } = Layout;

const Sidebar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    setSelectedMenuItem(e.key);
    
    // Navigate to the appropriate page based on the clicked menu item
    if (e.key === '1') {
      navigate('/');
    }
    // Add more conditions for other menu items if needed
  };

  return (
    <Sider width={200} className="site-layout" style={{ backgroundColor: 'white' }}>
     
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          color: '#fff',
          backgroundColor: '#4c4f6b',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#838390',
            marginRight: 12,
          }}
        ></div>
        <div>Ricard John</div>
        {<MenuOutlined style={{ marginLeft: '30px' }} />}
      </div>

      {/* Menu */}
      <Menu
        mode="inline"
        className="d"
        selectedKeys={[selectedMenuItem]}
        onClick={handleMenuClick}
        style={{ height: 'calc(100% - 64px)' }}
      >
        <Menu.Item
          key="1"
          style={{
            color: 'white',
            borderRadius: '10px',
            backgroundColor: selectedMenuItem === '1' ? '#13A487' : 'transparent',
          }}
          icon={<FaClipboard />}
         
          className="col"
        
        >
          Tasks
        </Menu.Item>

        <Menu.Item
          key="2"
          style={{
            color: 'white',
            backgroundColor: selectedMenuItem === '2' ? '#13A487' : 'transparent',
          }}
          icon={<FaClipboardCheck />}
          className="col"
        >
           {/* <span className="menu-item-icon-assign-tasks"></span> */}
            Assign tasks
        </Menu.Item>

        <Menu.Item
          key="3"
          className="col"
          style={{ color: 'white', backgroundColor: selectedMenuItem === '3' ? '#13A487' : 'transparent' }}
          icon={<BiClipboard />}
        >
          Rules
        </Menu.Item>
        <Menu.Item
          key="4"
          style={{ color: 'white', backgroundColor: selectedMenuItem === '4' ? '#13A487' : 'transparent' }}
          icon={<FaClipboardList />}
        >
          Reports
        </Menu.Item>
        {/* Add more menu items as needed */}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
