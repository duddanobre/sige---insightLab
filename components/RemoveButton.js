import React from 'react';
import {Button, Modal} from 'antd';
import {DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios';

export default function RemoveEvento(props){

    const { confirm } = Modal;

    function showDeleteConfirm() {
        confirm({
          title: 'Desea realmente excluir esse evento?',
          icon: <ExclamationCircleOutlined />,
          okText: 'Excluir',
          okType: 'danger',
          cancelText: 'Não',
          onOk() {
            deleteById(props.id);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

   async function deleteById(id){

        await axios.delete('/api/' + id, {
            responseType: 'json'
        }).then(() => {
            alert('Evento removido!');
        }).catch(err => {
            console.log(err)
        })   
    }
    
    return(
        <Button size="small" icon={<DeleteOutlined style={{color: '#cc2d37'}} />} 
            style={{borderColor: '#cc2d37', color: '#cc2d37'}} onClick={showDeleteConfirm}>
        </Button>
    )

}