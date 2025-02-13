import { Row, Col, Space, Typography, Tooltip } from 'antd';
import {
  YahooOutlined,
  XOutlined,
  FacebookOutlined,
  InstagramOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';

import dealershipLogo from '../assets/icons/dealership.png';
import darkDealershipLogo from '../assets/icons/dealership2.png';

const { Text } = Typography;

const AppFooter = ({
  toggleDarkMode,
  darkMode,
}: {
  toggleDarkMode: () => void;
  darkMode: boolean;
}) => {
  return (
    <footer className={`footer ${darkMode ? 'dark-mode' : ''}`}>
      <Row align="middle" justify="space-between">
        <Col>
          <Space className="footer-logo">
            <img
              src={darkMode ? darkDealershipLogo : dealershipLogo}
              alt="Company Logo"
              style={{ height: '50px' }}
            />
            <Space className="footer-socials">
              <FacebookOutlined className="footer-icon" />
              <InstagramOutlined className="footer-icon" />
              <XOutlined className="footer-icon" />
              <YahooOutlined className="footer-icon yahoo-icon" />
            </Space>
          </Space>
        </Col>

        <Col>
          <Text className="footer-text">
            &copy; {new Date().getFullYear()} Behbod Babai. All rights reserved.
          </Text>
        </Col>

        <Col>
          <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
            <Space onClick={toggleDarkMode} className="footer-dark-mode">
              {darkMode ? (
                <BulbFilled className="footer-dark-icon" />
              ) : (
                <BulbOutlined className="footer-dark-icon" />
              )}
            </Space>
          </Tooltip>
        </Col>
      </Row>
    </footer>
  );
};

export default AppFooter;
