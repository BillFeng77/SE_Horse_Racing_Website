import { Carousel } from 'antd';
import React from 'react';
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const carousel = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}><img herf="frontend/nextjs/src/Horse.png"></img></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img herf="frontend/nextjs/src/Horse1.jpg"></img></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img herf="frontend/nextjs/src/Horse2.jpeg"></img></h3>
    </div>
    <div>
      <h3 style={contentStyle}><img herf="frontend/nextjs/src/Horse3.jpg"></img></h3>
    </div>
  </Carousel>
);
export default carousel;