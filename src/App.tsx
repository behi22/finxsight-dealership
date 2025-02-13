import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import Home from './pages/Home';
import Settings from './pages/Settings';
import User from './pages/User';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';

import './styles/Global.css';

import './styles/components/Header.css';
import './styles/components/Navbar.css';
import './styles/components/Profile.css';
import './styles/components/Footer.css';

import './styles/pages/Home.css';
import './styles/pages/User.css';
import './styles/pages/Inventory.css';
import './styles/pages/Sales.css';
import './styles/pages/Settings.css';

const { Content } = Layout;

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <Router>
      <Layout style={{ backgroundColor: 'transparent' }}>
        <AppHeader />

        <Layout style={{ backgroundColor: 'transparent' }}>
          <Content
            style={{
              padding: '24px',
              backgroundColor: 'transparent',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/user" element={<User />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/sales" element={<Sales />} />
            </Routes>
          </Content>
        </Layout>

        <AppFooter toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </Layout>
    </Router>
  );
};

export default App;
