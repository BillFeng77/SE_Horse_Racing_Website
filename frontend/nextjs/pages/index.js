import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
// import NewsLinks from '../components/newsLinks';
import Image from 'next/image';
import Menu from '../components/menu';
import {Space} from 'antd';
import carousel from '../components/Carousel';
//import Marquee from 'react-fast-marquee';
import { Carousel } from 'antd';
import React from 'react';
import {Alert,Card} from 'antd';
import {Layout} from'antd';
import {Col,Divider, Row} from 'antd';
import { Badge, Calendar } from 'antd';
import {Content} from 'antd/lib/layout/layout';
import Horse from '../public/images/Horse.png';
import Horse1 from '../public/images/Horse1.jpg';
import Horse2 from '../public/images/Horse2.jpeg';
import Horse3 from '../public/images/Horse3.jpg';
import Horse4 from '../public/images/Horse4.jpg';
import Horse5 from '../public/images/Horse5.jpg';
import Horse6 from '../public/images/Horse6.jpg';
import Horse7 from '../public/images/Horse7.jpeg';
const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 1:
      listData = [
        {
          type: 'delby',
          content: 'It is 2022 delby final today',
        },
        {
          type: 'horse opening day',
          content: 'Go to opening day right now',
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
const monthCellRender = (value) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};
const dateCellRender = (value) => {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
};
const carouselStyle = {
  height: '600px',
  color: '#e6e6e6',
  lineHeight: '600px',
  width:"65%",
  display: 'flex',
  margin: "0 auto",
};
const {Footer}=Layout;
const {Meta}=Card;
export default function Home() {
  return (<>
    <Menu/>
    <Carousel autoplay='true' dotPosition='bottom' display='flex' margin="0 auto" color = "#e6e6e6">
    <div>
      <h1 style={carouselStyle}><Image src={Horse4} layout="intrinsic" /></h1>
    </div>
    <div>
      <h2 style={carouselStyle}><Image src={Horse5} layout="intrinsic"/></h2>
    </div>
    <div>
      <h3 style={carouselStyle}><Image src={Horse6}layout="intrinsic"/></h3>
    </div>
    <div>
      <h4 style={carouselStyle}><Image src={Horse7} layout="intrinsic"/></h4>
    </div>
  </Carousel>
    <Alert message={'Announcement Testing Testing Testing'} type="info" style = {{display:'flex', margin:"0 auto",marginTop: "50px", width:"50%", height:"25px", fontSize:"14px"}}>
    </Alert>
    <Row style = {{display:'flex', margin:"0 auto",marginTop: "100px", width:"70%"}}>
    <Space 
        size="large"
        style={{
        display: 'flex',
    }}>
        <Col>
      <Card hoverable style={{width:240}}
      cover={<Image alt="example" src={Horse}/>}>
         <Meta title="TestNews" />  
      </Card>
      </Col>

        <Col>
      <Card hoverable style={{width:240}} cover={<Image alt="example" src={Horse1}/>}>
        <Meta title="TestNews2" />  {/*description={NewsLinks} */}
      </Card>
      </Col>
    
    <Col >
    <Calendar style={{width:650,height:360}} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    {/* </Card> */}
    </Col>
    </Space>
    </Row>
    <Footer>
    </Footer>
    </>
  );
}

