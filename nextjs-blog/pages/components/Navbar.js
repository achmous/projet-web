 


  import React, { Component } from 'react';
  import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
  import { Breadcrumb, Layout, Menu } from 'antd';
 
  const { Header, Content, Footer, Sider } = Layout;
 
 
import 'bootstrap/dist/css/bootstrap.min.css';

const items1 = ['0'].map((key) => ({
  key,
  label: `Accueil `,
}));
 

class Navbar extends Component {
 
  render() {
    return (
  
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} items={items1} />
    </Header>

 
      );
  }
}
export default Navbar;