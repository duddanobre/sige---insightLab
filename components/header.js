import {Layout,  Menu } from 'antd';
import { Component } from 'react';
import {LogoutOutlined} from '@ant-design/icons';

export default class Header extends Component{
    render(){
        const { Header } = Layout; 
        return(
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div style={{float: 'left', width: '120px', height: '31px', margin: (16, 24, 16, 0), 
                color: '#fff'}}>
                  <a href="/"><span style={{fontSize: '20px', fontWeight: 'bold', color: '#fff'}}>SIGE</span></a> 
              </div>
              <Menu theme="dark" mode="horizontal" style={{float: 'right'}}>
                <Menu.Item key="1" style={{color: '#fff', fontSize: '16px', fontWeight: 400}}>
                <LogoutOutlined style={{fontSize: '16px', color:'#fff', marginRight: '10px', fontWeight: 400}} />
                  Sair
                </Menu.Item>
              </Menu>
            </Header>
        )
    }
}