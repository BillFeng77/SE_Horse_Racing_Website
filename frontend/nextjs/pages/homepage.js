import React from 'react';
import Menu from '../components/menu';
import calender from '../components/calendar';
import {Layout} from 'antd';
import carousel from '../components/Carousel';
const {Header, Footer, Sider, Content}=Layout;
const homePage=()=>{
    return (
        <Layout>
            <Header>
                <Menu></Menu>
                <carousel></carousel>
            </Header>
            <Content>
                <Sider>
                    <Space>
                        <Card>
                        </Card>
                    </Space>
                </Sider>
                <Sider>
                    <Space>
                        <calender>
                            
                        </calender>
                    </Space>
                </Sider>
            </Content>
            <Footer>

            </Footer>
        </Layout>
    )
}
export default homePage()