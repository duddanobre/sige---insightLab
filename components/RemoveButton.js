import React from 'react';
import {Button} from 'antd';
import {DeleteOutlined} from '@ant-design/icons'
import axios from 'axios';

export default function RemoveEvento(props){
    

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
            style={{borderColor: '#cc2d37', color: '#cc2d37'}} onClick={() => deleteById(props.id)}>
        </Button>
    )

}