import React from 'react';
import {Button} from 'antd';
import {DeleteOutlined} from '@ant-design/icons'
import axios from 'axios';

export default function RemoveEvento(){
    const id = '60d53ebdee0a7a10c8ddeb62';

    async function deleteById(id){
        try{
            await axios.delete('/api/', id)
        }catch (error) {
         alert('Falha ao deletar, tente novamente');
        }  
    }
    

    return(
        <Button size="small" icon={<DeleteOutlined style={{color: '#cc2d37'}} />} 
            style={{borderColor: '#cc2d37', color: '#cc2d37'}} onClick={deleteById(id)}>
        </Button>
    )

}