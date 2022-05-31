import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { } from 'antd';
import { Card, Tag, Col, Row, Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Menu, Breadcrumb } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';


const items1 = [{ key: '0', label: `Home` }]



const BASE_URL = "http://localhost:3000"



function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}



export const getStaticProps = async () => {
  const newArticles = await fetch(`${BASE_URL}/articles/top/10`, {});
  const newArticlesJSON = await newArticles.json();
  const allCaterories = await fetch(`${BASE_URL}/categories/find/all`, {});
  const allCategoriesJSON = await allCaterories.json();
  return {

    props: { articles: newArticlesJSON, categories: allCategoriesJSON }
  }
}

export default function Home({ articles, categories }) {

  return (<div>
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} items={items1} />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu mode="vertical" defaultSelectedKeys={['mail']}>
            <Menu.ItemGroup title="Categories">
              {categories.map(categorie => (
                   <Menu.Item key={ categorie.id } icon={<AppstoreOutlined />}>
                   {categorie.nom} ({categorie.CategoriesArticle.length})
                 </Menu.Item>
              ))}
            </Menu.ItemGroup>
    
          </Menu>

        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>10 Articles récents</Breadcrumb.Item>
          
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
             <div className="site-card-wrapper" style={{
                          height: "80%",
                          overflow : 'scroll'
                        }}>
                <Row gutter={8}>
                  {articles.map(article => (
                    <Col className='my-2 d-flex' span={6}>
                      <Card title={article.titre} className='mx-auto p-1  '
                        style={{
                          width: 280,
                        }}
                        cover={<img alt={'image' + article.id} src={article.image} />} bordered={true}>
                        {article.contenu}
                      </Card>
                    </Col>
                  ))}


                </Row>
              </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
    {/* <Head>
      <title>Blog</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Layout>
      <Navbar />
      <Content style={{ padding: '0 50px' }}>

        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>

          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Card title="Categories">

              <div className="site-card-wrapper">
                <Row gutter={12}>
                  {categories.map(categorie => (
                    <Tag>{categorie.nom} ({categorie.CategoriesArticle.length} artictes)</Tag>
                  ))}


                </Row>
              </div>
            </Card>
            <Card title="Top 10 article">

              <div className="site-card-wrapper">
                <Row gutter={8}>
                  {articles.map(article => (
                    <Col className='my-2 d-flex' span={6}>
                      <Card title={article.titre} className='mx-auto p-1  '
                        style={{
                          width: 200,
                        }}
                        cover={<img alt={'image' + article.id} src={article.image} />} bordered={true}>
                        {article.contenu}
                      </Card>
                    </Col>
                  ))}


                </Row>
              </div>
            </Card>

          </Content>
        </Layout>
      </Content>
    
    </Layout> */}
  </div>
  )
}
