import { React, useState } from 'react'
import Nav from '../components/menu'
import { Layout, Menu } from 'antd'
import ManageAccounts from '../components/admin-manage-accounts'
import PublishAnAnnouncement from '../components/admin-publish-an-announcement'
import PublishANews from '../components/admin-publish-a-news'
const { Header, Content, Footer, Sider } = Layout
export default function Admin () {
  const [menuItem, setMenuItem] = useState('3')
  const componentsSwitch = (key) => {
    switch (key) {
      case '1':
        return (<PublishANews
            style={{
              padding: '0 20px'
            }}>
        </PublishANews>)
      case '2':
        return (<PublishAnAnnouncement
            style={{
              padding: '0 20px'
            }}>
        </PublishAnAnnouncement>)
      case '3':
        return (<ManageAccounts
            style={{
              padding: '0 20px'
            }}>
        </ManageAccounts>)
      default:
        break
    }
  }
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
        margin: '0px 150px'
      }}
    >

      <Layout
        className="site-layout-background"
        style={{
          padding: '50px 0'
        }}
      >
        {/* <AdminSider/> */}
        <Sider className="site-layout-background" width={250}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['3']}
            defaultOpenKeys={['3']}
            selectedKeys={menuItem}
            onClick={(e) =>
              setMenuItem(e.key)}
            style={{
              height: '100%'
            }}
          >
            <Menu.Item key="1" >
                Publish a News
            </Menu.Item>

            <Menu.Item key="2" >
                Publish an Announcement
            </Menu.Item>

            <Menu.Item key="3" >
                Manage Accounts
            </Menu.Item>
          </Menu>
        </Sider>

        <Content
          style={{
            padding: '0 24px',
            minHeight: 280
          }}
        >
        </Content>
        {componentsSwitch(menuItem)}
      </Layout>
    </Content>

  </Layout>
  <Footer style = {{ marginTop: '300px', height: '300px', backgroundColor: '#88322F' }}>
    </Footer>

    </>
  )
}
