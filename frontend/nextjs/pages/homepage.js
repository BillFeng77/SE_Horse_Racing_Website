import React from 'react';
import Menu from '../components/menu';
import calender from '../components/calendar';
import {Layout} from 'antd';
const {Header, Footer, Sider, Content}=Layout;
const homePage=()=>{
    return (
        <Layout>
            <Header>
                <Menu></Menu>
            </Header>
            <Content>

            </Content>
            <Footer>

            </Footer>
        </Layout>
    )
}