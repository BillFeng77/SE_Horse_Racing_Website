import React from "react";
import Menu from "../components/menu";
import { Badge, Calendar, Layout } from "antd";
import styles from "../styles/calendar.module.css";
const { Footer } = Layout;

// calendar implementation, manually set events
export default function SelfCalendar() {
  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 10:
        listData = [
          {
            type: "warning",
            content: "2022 delby final",
          },
          {
            type: "warning",
            content: "horse opening day",
          },
        ];
        break;
      case 13:
        listData = [
          {
            type: "warning",
            content: "Horse racing today",
          },
        ];
        break;
      case 22:
        listData = [
          {
            type: "warning",
            content: "Horse racing today",
          },
        ];
        break;
      default:
    }
    return listData || [];
  };

  // get list data and manage the result of data into cell, and render it
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
      <Menu />
      <Calendar
        style={{ width: "80%", margin: "0 auto", backgroundColor: "#88322F" }}
        dateCellRender={dateCellRender}
      />
      <Footer
        style={{
          marginTop: "300px",
          height: "300px",
          backgroundColor: "#88322F",
        }}
      ></Footer>
    </>
  );
}
