import React from 'react';
import { Modal } from 'antd';

export default function CadastrarEvento(props){

  return (
    <div>
      <Modal title={props.title}
      cancelButtonProps={{ style: { display: 'none' } }}
      onOk={props.ok}  
      visible={props.visible}
      style={{top: 35}}
      closable={false}
      >
        {props.children}
      </Modal>
      </div>
  );
};
