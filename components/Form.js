import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
} from 'antd';

import axios from 'axios';

export default function Formulario(){

const [nome, setNome] = useState("");
const [horario, setHorario] = useState("");
const [local, setLocal] = useState("");
const [participantes, setParticipantes] = useState([{}]);
const [atividades, setAtividades] = useState([{}]);

async function handleCadEvento(e){
  e.preventDefault();

  const data = {nome, horario, local, participantes, atividades};

  try {
   await axios.post('/api/inserirEvento', data);
  } catch (error) {
    alert('Erro ao cadastrar o evento, verifique os dados e tente novamente.', error);
  }
    
}

  return (
    <div>
      <Form 
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        size="small"
      >
        <Form.Item name="Tema do evento" label="Tema">
          <Input value={nome} onChange={(e) => setNome(e.target.value)} />
        </Form.Item>
        <Form.Item label="Horário" name="horario">
          <Input value={horario} onChange={(e) => {setHorario(e.target.value)}} />
        </Form.Item>
        <Form.Item label="Local" name="local">
          <Select>
            <Select.Option value={local} onChange={(presencial) => {setLocal(presencial)}}>Presencial</Select.Option>
            <Select.Option value={local} onChange={(virtual) => {setLocal(virtual)}}>Virtual</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleCadEvento}>Cadastrar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
