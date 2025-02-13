import React from 'react';
import { Space, Typography } from 'antd';
import { BuildOutlined } from '@ant-design/icons';

const { Title } = Typography;

const InventoryManagement: React.FC = () => {
  return (
    <div className="construction-container">
      <Space size="large" direction="vertical" style={{ alignItems: 'center' }}>
        <BuildOutlined style={{ fontSize: 100, color: '#1890ff' }} />
        <Title level={2}>This Page is Under Construction</Title>
        <p style={{ fontSize: '20px', color: 'red' }}>
          We are working hard to get this page up and running. Please check back
          soon!
        </p>
      </Space>
    </div>
  );
};

export default InventoryManagement;
