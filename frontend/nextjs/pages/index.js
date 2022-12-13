// import NewsLinks from '../components/newsLinks';
import Image from 'next/image'
// import Selfmenu from '../components/menuv2'
import Menu from '../components/menu'
import { Carousel, Alert, Card, Layout, Col, Row, Space } from 'antd'
import React, { useState } from 'react'
import axios from 'axios'
import Horse from '../public/images/Horse.png'
import Horse1 from '../public/images/Horse1.jpg'
import Horse2 from '../public/images/Horse2.jpeg'
import Horse4 from '../public/images/Horse4.jpg'
import Horse5 from '../public/images/Horse5.jpg'
import Horse6 from '../public/images/Horse6.jpg'
import Horse7 from '../public/images/Horse7.jpeg'
import Link from 'next/link'
import Searchnews from '../components/searchNews'

const carouselStyle = {
  height: '600px',
  color: '#e6e6e6',
  lineHeight: '600px',
  width: '65%',
  display: 'flex',
  margin: '0 auto'
}
const { Footer } = Layout
const { Meta } = Card

export default function Home () {
  const [annoucements, setAnnouncements] = useState('')
  axios.get('http://127.0.0.1:5000/api/announcements')
    .then(function (response) {
      console.log(response.data)
      setAnnouncements(response.data.content)
    })
    .catch(function (error) {
      console.log(error)
    })
  return (<>
    <Menu/>
    <Carousel autoplay='true' dotPosition='bottom' display='flex' margin="0 auto" style = {{ backgroundColor: '#88322F' }}>
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
    <Alert message={<marquee>{annoucements}</marquee>} type="info" style = {{ display: 'flex', margin: '0 auto', marginTop: '50px', width: '50%', height: '25px', fontSize: '14px' }}>
    </Alert>
    <Row style = {{ display: 'flex', margin: '0 auto', marginTop: '100px', width: '70%' }}>
    <Space
        size="large"
        style={{
          display: 'flex'
        }}>
      <Searchnews/>
      <Col>
      <Link href="/news/Advances in Equine Infectious Disease Detection">
      <Card hoverable style={{ width: 260, height: 260, borderColor: '#eee7e7', borderWidth: '2px' }} cover={<Image alt="example" src={Horse} />}>
         <Meta title="Infectious Disease" />
      </Card>
      </Link>
      </Col>

      <Col>
      <Link href="/news/Is Your Horse at Risk of Colic">
      <Card hoverable style={{ width: 260, height: 260, borderColor: '#eee7e7', borderWidth: '2px' }} cover={<Image alt="example" src={Horse1} />}>
        <Meta title="Risk of Colic" />
      </Card>
      </Link>
      </Col>

      <Col>
      <Link href="/news/Advances in Diagnosing Equine Dental Disease">
      <Card hoverable style={{ width: 260, height: 260, borderColor: '#eee7e7', borderWidth: '2px' }} cover={<Image alt="example" src={Horse2} />}>
        <Meta title="Dental Disease" />
      </Card>
      </Link>
      </Col>

    </Space>
    </Row>
    <Footer style = {{ marginTop: '300px', height: '300px', backgroundColor: '#88322F' }}>
    </Footer>
    </>
  )
}
