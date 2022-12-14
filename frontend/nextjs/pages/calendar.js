import React from 'react'
// import Selfmenu from '../components/menuv2'
import Menu from '../components/menu'
import { Badge, Calendar, Layout } from 'antd'
import styles from '../styles/calendar.module.css'
const { Footer } = Layout

export default function Home () {
  const getListData = (value) => {
    let listData
    switch (value.date()) {
      case 1:
        listData = [
          {
            type: 'warning',
            content: '2022 delby final'
          },
          {
            type: 'warning',
            content: 'horse opening day'
          }
        ]
        break
      default:
    }
    return listData || []
  }
  const monthCellRender = () => {
  }
  const dateCellRender = (value) => {
    const listData = getListData(value)
    return (
      <ul className={styles.events}>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
    <Menu/>

    <Calendar style={{ width: '80%', margin: '0 auto', backgroundColor: '#88322F' }} dateCellRender={dateCellRender} monthCellRender={monthCellRender} />

    <Footer style = {{ marginTop: '300px', height: '300px', backgroundColor: '#88322F' }}>
    </Footer>

    </>
  )
}
