import React from 'react';
import { Layout, Menu, Card} from 'antd';

export default function Home() {
  const { Header, Content } = Layout;
  
  return (
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div style={{float: 'left', width: '120px', height: '31px', margin: (16, 24, 16, 0), 
      color: '#fff'}}>
           <a href="/"><span>SIGE</span></a> 
      </div>
      <Menu theme="dark" mode="horizontal" style={{float: 'right'}}>
        <Menu.Item key="1">Sign out</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', marginTop: 64,  background: '#fff'}}>
      <div style={{ padding: 24, minHeight: 380, background: '#fff', color: '#fff'}}>
      <Card title="Agenda">
      
      </Card>
      </div>
    </Content>
    
  </Layout>
  );
}