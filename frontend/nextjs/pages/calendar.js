import React from 'react';
import Nav from '../components/menu';
import Selfmenu from '../components/menuv2';
import { Badge, Calendar } from 'antd';
import styles from '../styles/calendar.module.css';
import {Layout} from'antd';
const {Footer}=Layout;

export default function Home() {
  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 1:
        listData = [
          {
            type: 'warning',
            content: '2022 delby final',
          },
          {
            type: 'warning',
            content: 'horse opening day',
          },
        ];
        break;
      default:
    }
    return listData || [];
  };
  const getMonthData = (value) => {
    // if (value.month() === 8) {
    //   return 1394;
    // }
  };
  const monthCellRender = (value) => {
    // const num = getMonthData(value);
    // return num ? (
    //   <div className={styles.notes-month}>
    //     <section>{num}</section>
    //     <span>Backlog number</span>
    //   </div>
    // ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className={styles.events}>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
    <Selfmenu/>

    <Calendar style={{width:"80%", margin:"0 auto", backgroundColor:"#88322F"}} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />

    <Footer style = {{marginTop: "300px", height:"300px", backgroundColor: "#88322F"}}>
    </Footer>
    
    </>
  );
}


