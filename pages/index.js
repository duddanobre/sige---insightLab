import React, { useState } from 'react';
//import { connectToDatabase } from "../util/mongodb";
import { Layout, Menu, Card, Table, Tag, Space, List} from 'antd';

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const { Header, Content } = Layout;
  const columns = [
    {
      title: 'Evento',
      dataIndex: 'evento',
      key: 'evento',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Hora',
      dataIndex: 'hora',
      key: 'hora',
    },
    {
      title: 'Local',
      dataIndex: 'local',
      key: 'local',
    },
    {
      title: 'Participantes',
      key: 'participantes',
      render: () => (
        <Space size="middle">
          <a onClick={showModal}>Visualizar</a>
        </Space>
      ),
    },
    {
      title: 'Atividades',
      key: 'atividades',
      dataIndex: 'atividades',
      render: atividades => (
        <>
          {atividades.map(atividade => {
            let color = atividade.length > 5 ? 'geekblue' : 'green';
            if (atividade === 'Encerramento do evento') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={atividade}>
                {atividade.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text, record) => (
        <Space size="middle">
          <a>editar {record.name}</a>
          <a>remover</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      evento: 'Viagem à Maraguape CE',
      hora: '09:00',
      local: 'Maranguape',
      atividades: ['Inuguração da praça infantil', 'Encerramento do evento'],
      },
    {
      key: '2',
      evento: 'Viagem à Maraguape CE',
      hora: '09:00',
      local: 'Maranguape',
      atividades: ['Inuguração da praça infantil', 'Coffe Break com Senador do Estado', 'Encerramento do evento'],
    },
    {
      key: '3',
      evento: 'Viagem à Maraguape CE',
      hora: '09:00',
      local: 'Maranguape',
      atividades: ['Inuguração da praça infantil', 'Encerramento do evento'],
    },
  ];
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
        <Table columns={columns} dataSource={data} />
      </Card>
      </div>
    </Content>
    
  </Layout>
  );
}