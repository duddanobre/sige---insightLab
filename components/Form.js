import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Divider
} from 'antd';

import axios from 'axios';

export default function Formulario(){

const [form] = Form.useForm();
const [form2] = Form.useForm();

const [nome, setNome] = useState("");
const [horario, setHorario] = useState("");
const [local, setLocal] = useState("presencial");
const [participantes, setParticipantes] = useState({});
const [atividades, setAtividades] = useState([{atividade:"", data:""}]);
const [campos, setCampos] = useState({atividade:'', data:''})

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

async function handleCadEvento(e){
  e.preventDefault();
  const data = {nome, horario, local, participantes, atividades};

  try {
   await axios.post('/api/inserirEvento', data);
   form.resetFields();
   form2.resetFields();
  } catch (error) {
    alert('Erro ao cadastrar o evento, verifique os dados e tente novamente.', error);
  }
  alert('Evento cadastrado com sucesso!');
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
        size="middle"
      >
        <Form.Item name="Tema do evento" label="Tema" rules={[{required: true,},]}>
          <Input value={nome} onChange={(e) => setNome(e.target.value)} />
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
          <Form.Item name="Atividade" label="atividade" rules={[{required: true,},]}>
              <Input name="atividade" id="atividade" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item name="Data" label="data" rules={[{required: true,},]}>
              <Input name="data" id="data" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item>
            <Button style={{borderColor: '#3390b5', color: '#3390b5', marginLeft: 250}} onClick={handleCadAtividades}>Adicionar</Button>
            </Form.Item>
            <Form.Item>
            <Button style={{borderColor: '#2f994c', color: '#2f994c', top: 30}} onClick={handleCadEvento}>Cadastrar</Button>
            </Form.Item>
        </Form>
    </div>
  );
};
