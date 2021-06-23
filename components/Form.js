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

const [nome, setNome] = useState('Duda');
const [horario, setHorario] = useState('');
const [local, setLocal] = useState('');
const [participantes, setParticipantes] = useState([{}]);
const [atividades, setAtividades] = useState([{}]);

function handleCadEvento(){
    axios.post('/api/inserirEvento', {nome}, {horario}, {local}, {participantes}, {atividades});
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
          <Input />
        </Form.Item>
        <Form.Item label="Horário">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Local">
          <Select>
            <Select.Option value="demo">Presencial</Select.Option>
            <Select.Option value="demo">Virtual</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Data">
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleCadEvento}>Cadastrar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
