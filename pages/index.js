import React, {useState } from 'react';
import { connectToDatabase } from "../util/mongodb";
import { Layout, Card, Table, Tag, Space, Button} from 'antd';
import {RotateLeftOutlined, PlusOutlined} from '@ant-design/icons';
import CadastrarEvento from '../components/Modal';
import Form from '../components/Form';

export default function Home( {eventos} ) {
  const participantesVisible = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
 const refreshPage = ()=>{
    window.location.reload(); 
 }

  const showParticipantes = () => {
    participantesVisible(true);
  };

  const showCadEvento = () => {
    setModalVisible(true);
  };

  const { Content } = Layout;
  const columns = [
    {
      title: "Evento",
      key: "nome",
      dataIndex:"nome",
      render: nome => <div>{nome}</div>
    },
    {
      title: "Horário",
      key: "horario",
      dataIndex: "horario",
      render: horario => <div>{horario}</div>
    },
    {
      title: "Local",
      key: "local",
      dataIndex: "local",
      render: local => <div>{local}</div>
    },
    {
      title: 'Participantes',
      key: 'participantes',
      render: () => (
        <Space size="middle">
          <a onClick={showParticipantes}>Visualizar</a>
        </Space>
      ),
    },
    {
      title: 'Atividades',
      key: 'atividades',
      dataIndex: 'atividades',
      render: (atividades) => {
       let color = atividades.length > 5 ? 'geekblue' : 'green'
            if (atividades.atividade === 'Encerramento do evento') 
            color = 'volcano' 
            return (
              <div key={atividades.atividade}>
                <Tag color={color} key={atividades.atividade} style={{marginBottom: '10px'}}>
                  {atividades.atividade} - {atividades.data}
                </Tag>
                  
              </div>
            );
          
      
      },
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
    <Content style={{ padding: '0 50px', marginTop: 64,  background: '#fff'}}>
      <div style={{ padding: 24, minHeight: 380, background: '#fff', color: '#fff'}}>
      <Button icon={<RotateLeftOutlined style={{color: '#2f994c'}} />} 
        style={{borderColor: '#3390b5', color: '#3390b5', bottom: 15}} onClick={refreshPage}>
          Atualizar 
      </Button>
      <Card title="Agenda" extra={
        <Button icon={<PlusOutlined style={{color: '#2f994c'}} />} 
        style={{borderColor: '#2f994c', color: '#2f994c'}} onClick={showCadEvento}>
          Cadastrar evento
        </Button>
      }>
          <Table columns={columns} dataSource={eventos} rowKey={evento=>evento._id} />
      </Card>
      </div>
    </Content>
    <CadastrarEvento visible={modalVisible} ok={() => {setModalVisible(false)}}>
      <Form />
    </CadastrarEvento>
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

