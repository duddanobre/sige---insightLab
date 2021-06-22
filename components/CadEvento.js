import React, { useState } from 'react';
import { Modal, Button } from 'antd';

export default function CadastrarEvento(props){

  return (
    <div>
      <Modal title="Basic Modal" onOk={props.ok} onCancel={props.cancel} visible={props.visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      </div>
  );
};




/*function handleCadEveto(){
    axios.post('/api/inserirEvento', {nome}, {horario}, {local}, {participantes}, {atividades});
  } */