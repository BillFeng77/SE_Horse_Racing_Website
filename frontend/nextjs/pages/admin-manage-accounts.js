import React from 'react';
import Nav from '../components/menu';
import AdminSider from '../components/admin_sider';

const { Header, Content, Footer, Sider } = Layout;
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import ManageAccounts from '../components/admin-manage-accounts';

export default function Home() {
  return (
    <>
    <Nav/>

    <Layout>
    {/* <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
    </Header> */}
    <Content
      style={{
        padding: '0px 100px',
        margin: '0px 150px',
      }}
    >
      
      <Layout
        className="site-layout-background"
        style={{
          padding: '50px 0',
        }}
      >
        {/* <AdminSider/> */}
        <Sider className="site-layout-background" width={250}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['2']}
            defaultOpenKeys={['2']}
            style={{
              height: '100%',
            }}
            // items={items1}
            // onclick = {handleclick({ item, key, keyPath, domEvent})}
          >
            <Menu.Item key="1" >
            <Link href="/admin-publish-a-news">
                <a>Publish a News</a>
            </Link>
            </Menu.Item>

            <Menu.Item key="2" >
            <Link href="/admin-publish-an-announcement">
                <a>Publish an Announcement</a>
            </Link>
            </Menu.Item>

            <Menu.Item key="3" >
            <Link href="/admin-manage-accounts">
                <a>Manage Accounts</a>
            </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Content
          style={{
            padding: '0 24px',
            minHeight: 280,
          }}
        >
          {/* Content */}
         
          
        </Content>
        <ManageAccounts
            style={{
            padding: '0 20px',
          }}>
        </ManageAccounts>
      </Layout>
    </Content>
    
  </Layout>

    
    </>
  );
}


