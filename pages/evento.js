import React, { useState, useEffect } from 'react';
import {
  Space,  
  Layout,
  Form,
  Input,
  Button,
  Select,
  Divider,
  Row,
  Col,
  List
} from 'antd';
import {DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function EditarEvento({id}){

const { Content } = Layout;    

const [form] = Form.useForm();
const [form2] = Form.useForm();
const [form3] = Form.useForm();

const [_id, setId] = useState('');
const [nome, setNome] = useState("");
const [date, setDate] = useState("");
const [horario, setHorario] = useState("");
const [local, setLocal] = useState("presencial");
const [atividades, setAtividades] = useState([{atividade:"", data:""}]);
const [campos, setCampos] = useState({atividade:'', data:''});
const [participantes, setParticipantes] = useState([{nome:""}]);
const [inputs, setInputs] = useState({nome:''});

useEffect(() => {
  axios.get('/api/'+id).then(response => {
    setId(response.data._id);  
    setNome(response.data.nome);
    setDate(response.data.date);
    setHorario(response.data.horario);
    setLocal(response.data.local);
    setAtividades(response.data.atividades);
    setParticipantes(response.data.participantes);
    console.log(response.data.atividades, response.data.participantes);
})
  
}, [id]);

function handleInputChange(event){
  event.preventDefault();
  campos[event.target.name] = event.target.value;
  setCampos(campos);
}

function handleCadAtividades(e){
  e.preventDefault();
 const atividadesList =  atividades
 //.filter(item => {item.atividade != "" && item.data != ""})
 .map((i) => ({
      atividade: i.atividade,
      data: i.data,
  }))
  atividadesList.unshift({
    atividade: campos.atividade,
    data: campos.data
  })
  setAtividades(atividadesList);
  form2.resetFields();
}

function deleteAtividade(atvd){
    try {
        const atvdList =  atividades
        .filter(atividade => atividade.atividade !== atvd)
        .map((i) => ({
             atividade: i.atividade,
             data: i.data,
         }))
         setAtividades(atvdList);
         alert('Atvidade removida.')
    } catch (error) {
        alert('Falha ao deletar, tente novamente');
    }
}

function handleInputChanged(event){
  event.preventDefault();
  inputs[event.target.name] = event.target.value;
  setInputs(inputs);
}

function handleCadParticipantes(e){
  e.preventDefault();
 const participantesList =  participantes
 .map((i) => ({
      nome: i.nome
  }))
  participantesList.unshift({
    nome: inputs.nome
  })
  setParticipantes(participantesList);
  form3.resetFields();
}

function deleteParticipante(nome){
    try {
        const participanteList =  participantes
        .filter(participante => participante.nome !== nome)
        .map((i) => ({
             nome: i.nome
         }))
         setParticipantes(participanteList);
         alert('Participante removido.')
    } catch (error) {
        alert('Falha ao deletar, tente novamente');
    }
}

 function handleEditEvento(e){
    e.preventDefault();
    const data = {_id, nome, date, horario, local, participantes, atividades};
  
     axios.put('/api/' +_id, data).then(() =>{
        alert('Evento alterado com sucesso');
     }).catch(error => alert('Falha ao editar evento', error));
     
  }
  return (
    <Layout>
        <Content style={{ padding: '0 50px', marginTop: 64,  background: '#fff'}}>
                <div style={{ padding: 24, minHeight: 380, background: '#fff', color: '#fff'}}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={8}>  
                            <Divider>Editar evento</Divider>
                            <Form form={form}
                                labelCol={{
                                span: 4,
                                }}
                                wrapperCol={{
                                span: 14,
                                }}
                                layout="horizontal"
                                size="small"
                                fields={[
                                    {name: ["tema"], value: nome,},
                                    { name: ["horario"], value: horario,},
                                    { name: ["local"], value: local,},
                                    { name: ["Data"], value: date,},
                                  ]}
                            >
                                <Form.Item name="tema" label="Tema" rules={[{required: true,},]}>
                                    <Input value={nome} onChange={(e) => setNome(e.target.value)} />
                                </Form.Item>
                                <Form.Item name="Data" label="Data" rules={[{required: true,},]}>
                                    <Input value={date} onChange={(e) => setDate(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Horário" name="horario" rules={[{required: true,},]}>
                                    <Input  value={horario} onChange={(e) => {setHorario(e.target.value)}} />
                                </Form.Item>
                                <Form.Item label="Local" name="local" rules={[{required: true,},]}>
                                    <Select value={local} onChange={(value) => {setLocal(value)}}> 
                                        <Select.Option value="presencial">Presencial</Select.Option>
                                        <Select.Option value="virtual">Virtual</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Divider>Atividades</Divider>
                            <Form form={form2} layout="horizontal" size="small"
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            >
                                <Form.Item>
                                    <Button style={{borderColor: '#3390b5', color: '#3390b5', left: 50}} 
                                     onClick={handleCadAtividades}>
                                        Adicionar
                                    </Button>
                                </Form.Item>
                                <Form.Item name="Atividade" label="atividade">
                                    <Input name="atividade" id="atividade" onChange={handleInputChange} />
                                </Form.Item>
                                <Form.Item name="Data" label="data">
                                <Input name="data" id="data" onChange={handleInputChange} />
                                </Form.Item>
                            </Form>
                            <Space style={{ display: 'block'}}>
                                {atividades.map(item =>
                                <List key={item} 
                                    size="small"
                                    bordered
                                    style={{top: 15}}
                                    >
                                    <List.Item>{item.atividade} - {item.data}
                                    <Button shape="round" size="small" icon={<DeleteOutlined style={{color: '#cc2d37'}} />} 
                                    style={{ color: '#cc2d37', left: 2, border: 'none'}}
                                    onClick={() => deleteAtividade(item.atividade)}
                                    >
                                    </Button>
                                    </List.Item>
                                </List>
                                )}
                            </Space>    
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Divider>Participantes</Divider>
                            <Form form={form3} layout="horizontal" size="small"
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 14,
                                }}
                            >
                                <Form.Item>
                                    <Button style={{borderColor: '#3390b5', color: '#3390b5', left: 50}} 
                                    onClick={handleCadParticipantes}>
                                        Adicionar
                                    </Button>
                                </Form.Item>
                                <Form.Item name="Nome" label="nome">
                                    <Input name="nome" id="nome" onChange={handleInputChanged} />
                                </Form.Item>
                                <Col className="gutter-row" span={24}>
                                    <Form.Item>
                                        <Button size="large"
                                        style={{borderColor: '#2f994c', color: '#2f994c', top: 300, left: 50}} 
                                        onClick={handleEditEvento}>
                                            Editar Evento
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Form> 
                            <Space style={{ display: 'block'}}>
                                {participantes.map(item =>
                                <List key={item} 
                                    size="small"
                                    bordered
                                    >
                                    <List.Item>{item.nome}
                                    <Button shape="round" size="small" icon={<DeleteOutlined style={{color: '#cc2d37'}} />} 
                                    style={{ color: '#cc2d37', left: 2, border: 'none'}}
                                    onClick={() => deleteParticipante(item.nome)}
                                    >
                                    </Button>
                                    </List.Item>
                                </List>
                                )}
                            </Space>  
                        </Col>
                    </Row>   
                </div> 
        </Content>
    </Layout>
  );
};

EditarEvento.getInitialProps = ({ query: { id } }) => {
    return { id }
  }