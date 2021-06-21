import React, { useState } from 'react';
import { connectToDatabase } from "../util/mongodb";
import { Layout, Menu, Card, Table, Tag, List, Space} from 'antd';

export default function Home( {eventos} ) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const { Header, Content } = Layout;
  const columns = [
    {
      title: "Evento",
      key: "evento",
      render: ({}) => (
        <>
          {eventos.map(evento => {
           
            return (
              <List key={evento._id}>
                <List.Item> {evento.tema}</List.Item>
              </List>
            );
          })}
        </>
      ),
    },
    {
      title: "Horário",
      key: "horario",
      render: ({}) => (
        <>
          {eventos.map(evento => {
           
            return (
              <List key={evento._id}>
                <List.Item> {evento.horario}</List.Item>
              </List>
            );
          })}
        </>
      ),
    },
    {
      title: "Local",
      key: "local",
      render: ({}) => (
        <>
          {eventos.map(evento => {
            return (
              <List key={evento._id}>
                <List.Item> {evento.local}</List.Item>
              </List>
            );
          })}
        </>
      ),
    },
    {
      title: "Evento",
      key: "evento",
      render: ({}) => (
        <>
          {eventos.map(evento => {
            return (
              <List key={evento._id}>
                <List.Item> {evento.tema}</List.Item>
              </List>
            );
          })}
        </>
      ),
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
      render: ({}) => (
        <>
          {eventos.map(evento => {
                 
            let color = evento.atividades.length > 5 ? 'geekblue' : 'green';
            if (evento.atividades === 'Encerramento do evento') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={evento._id}>
                {evento.atividades}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: () => (
        <Space size="middle">
          <a>editar</a>
          <a>remover</a>
        </Space>
      ),
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
        <Table columns={columns} dataSource={eventos} />
      </Card>
      </div>
    </Content>
    
  </Layout>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const eventos = await db
    .collection("evento")
    .find({})
    .toArray();
  return {
    props: {
      eventos: JSON.parse(JSON.stringify(eventos)),
    },
  };
} 

