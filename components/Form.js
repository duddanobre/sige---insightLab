import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
} from 'antd';

import axios from 'axios';

export default function Formulario(){

const [form] = Form.useForm();
const [form2] = Form.useForm();
const [form3] = Form.useForm();

const [date, setDate] = useState("");
const [nome, setNome] = useState("");
const [horario, setHorario] = useState("");
const [local, setLocal] = useState("presencial");
const [atividades, setAtividades] = useState([{atividade:"", data:""}]);
const [campos, setCampos] = useState({atividade:'', data:''});
const [participantes, setParticipantes] = useState([{nome:""}]);
const [inputs, setInputs] = useState({nome:''});

function handleInputChange(event){
  event.preventDefault();
  campos[event.target.name] = event.target.value;
  setCampos(campos);
}

function handleCadAtividades(e){
  e.preventDefault();
 const atividadesList =  atividades
 .filter(item => {item.atividade != "" && item.data != ""})
 .map((i) => ({
      atividade: i.atividade,
      data: i.data,
  }))
  atividadesList.unshift({
    atividade: campos.atividade,
    data: campos.data
  })
  setAtividades(atividadesList);
  console.log(atividades)
  form2.resetFields();
}

function handleInputChanged(event){
  event.preventDefault();
  inputs[event.target.name] = event.target.value;
  setInputs(inputs);
}

function handleCadParticipantes(e){
  e.preventDefault();
 const participantesList =  participantes
 .filter(item => {item.nome != ""})
 .map((i) => ({
      nome: i.nome
  }))
  participantesList.unshift({
    nome: inputs.nome
  })
  setParticipantes(participantesList);
  console.log(participantes)
  form3.resetFields();
}

async function handleCadEvento(e){
  e.preventDefault();
  const data = {nome, date, horario, local, participantes, atividades};

  try {
   await axios.post('/api/inserirEvento', data);
   alert('Evento cadastrado com sucesso!');
   form.resetFields();
   form2.resetFields();
  } catch (error) {
    alert('Erro ao cadastrar o evento, verifique os dados e tente novamente.', error);
  }
}

  return (
    <div>
      <Form form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        size="small"
      >
        <Form.Item name="Tema do evento" label="Tema" rules={[{required: true,},]}>
          <Input value={nome} onChange={(e) => setNome(e.target.value)} />
        </Form.Item>
        <Form.Item name="Data" label="Data" rules={[{required: true,},]}>
          <Input value={date} onChange={(e) => setDate(e.target.value)} />
        </Form.Item>
        <Form.Item label="Horário" name="horario" rules={[{required: true,},]}>
          <Input value={horario} onChange={(e) => {setHorario(e.target.value)}} />
        </Form.Item>
        <Form.Item label="Local" name="local" rules={[{required: true,},]}>
          <Select value={local} onChange={(value) => {setLocal(value)}}> 
          <Select.Option value="presencial">Presencial</Select.Option>
          <Select.Option value="virtual">Virtual</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Divider>Atividades</Divider>
        <Form form={form2} layout="horizontal" size="small"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
        >
          <Form.Item name="Atividade" label="atividade">
              <Input name="atividade" id="atividade" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item name="Data" label="data">
              <Input name="data" id="data" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item>
            <Button style={{borderColor: '#3390b5', color: '#3390b5'}} onClick={handleCadAtividades}>Adicionar</Button>
            </Form.Item>
        </Form>
    <Divider>Participantes</Divider>
    <Form form={form3} layout="horizontal" size="small"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
        >
       <Form.Item name="Nome" label="nome">
          <Input name="nome" id="nome" onChange={handleInputChanged} />
       </Form.Item>
       <Form.Item>
          <Button style={{borderColor: '#3390b5', color: '#3390b5'}} onClick={handleCadParticipantes}>Adicionar</Button>
       </Form.Item>
       <Form.Item>
          <Button style={{borderColor: '#2f994c', color: '#2f994c', marginLeft: '200px', width: 90, height: 40}} onClick={handleCadEvento}>Cadastrar</Button>
       </Form.Item>
      </Form>  
    </div>
  );
};
