
import React from 'react';
import { Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../App.css';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header
      className="site-layout-background"
      style={{
        textAlign: 'right',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end', // Align content to the right side
        paddingRight: '16px',
      }}
    >
      {/* Add content for the app header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          color: 'black',
          marginLeft: 'auto', // Move the content to the right
        }}
      >
        {/* Circle */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#838390',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '8px',
          }}
        >
          {/* User Icon */}
          <UserOutlined style={{ fontSize: '20px', color: 'white' }} />
        </div>
        <div>Richard John</div>
      </div>
    </Header>
  );
};

export default AppHeader;
