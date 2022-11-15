import React from 'react';
import Menu from '../components/menu';
import calender from '../components/calendar';
import {Pagecontainer} from "umi";
import {Layout} from 'antd';
import carousel from '../components/Carousel';
const {Header, Footer, Sider, Content}=Layout;
const homePage=()=>{
    return (
        <Pagecontainer>
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
        </Pagecontainer>
    )
}