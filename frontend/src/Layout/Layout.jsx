import React from 'react';
import { Layout } from 'antd';
import App from '../App';

const { Header, Content, Footer } = Layout;

const AppLayout = () => {
  return (
    <Layout className="layout">
      <Header>
        {/* Place your header components here */}
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <App />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        {/* Place your footer components here */}
      </Footer>
    </Layout>
  );
};

export default AppLayout;
