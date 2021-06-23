import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from 'antd';

import axios from 'axios';

export default function Formulario(){

const [form] = Form.useForm();

const [nome, setNome] = useState("");
const [horario, setHorario] = useState("");
const [local, setLocal] = useState("presencial");
const [participantes, setParticipantes] = useState([{}]);
const [atividades, setAtividades] = useState([{}]);


async function handleCadEvento(e){
  e.preventDefault();

  const data = {nome, horario, local, participantes, atividades};

  try {
   await axios.post('/api/inserirEvento', data);
   form.resetFields();
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
        <Form.Item label="Horário" name="horario" rules={[{required: true,},]}>
          <Input value={horario} onChange={(e) => {setHorario(e.target.value)}} />
        </Form.Item>
        <Form.Item label="Local" name="local" rules={[{required: true,},]}>
          <Select value={local} onChange={(value) => {setLocal(value)}}> 
          <Select.Option value="presencial">Presencial</Select.Option>
          <Select.Option value="virtual">Virtual</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleCadEvento}>Cadastrar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
