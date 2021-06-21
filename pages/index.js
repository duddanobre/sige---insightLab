import React, { useState } from 'react';
import { connectToDatabase } from "../util/mongodb";
import { Layout, Card, Table, Tag,Space} from 'antd';
import LayoutNxt from 'antd/lib/layout/layout';

export default function Home( {eventos} ) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const { Content } = Layout;
  const columns = [
    {
      title: "Evento",
      key: "tema",
      dataIndex:"tema",
      render: tema => <div>{tema}</div>
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
            if (atividade.atividade === 'Encerramento do evento') {
              color = 'volcano';
              
            }
            return (
              <div>
                <Tag color={color} key={atividade}>
                {atividade.atividade} - {atividade.data}
                </Tag>
                
              </div>
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
<LayoutNxt>
<Layout>
    <Content style={{ padding: '0 50px', marginTop: 64,  background: '#fff'}}>
      <div style={{ padding: 24, minHeight: 380, background: '#fff', color: '#fff'}}>
      <Card title="Agenda">
          <Table columns={columns} dataSource={eventos}/>
      </Card>
      </div>
    </Content>
  </Layout>
</LayoutNxt> 

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

