import React from 'react';
import {Button} from 'antd';
import {DeleteOutlined} from '@ant-design/icons'

export default function RemoveEvento(){

    return(
        <Button size="small" icon={<DeleteOutlined style={{color: '#cc2d37'}} />} 
            style={{borderColor: '#cc2d37', color: '#cc2d37'}}>
        </Button>
    )

}