import Layout from '../components/layout';
import Menu from '../components/menu';
import Selfmenu from '../components/menuv2';
import React , { useEffect,useState,useRef}from "react";
import {Button,Table,Space} from 'antd';
import {useRouter} from 'next/router'
import axios from 'axios'; 
import {Player} from 'video-react';
import ReactPlayer from'react-player/youtube';
import newsContent from './news/[...slug]';
//import Video from "../public/vecteezy_a-dirty-white-horse-is-eating-fresh-plants-at-burgaz-island-in-istanbul_2020599.mp4";
//import "../node_modules/video-react/dist/video-react.css";
/*const [date,setDate]=useRef();
const [horse,setHorse]=useRef();
const [age,setAge]=useRef();
const [country,setCountry]=useRef();
const [raceName,setRaceName]=useRef();
const[distanceFurlongs,setdistanceFurlongs]=useRef();
const [surface,setSurface]=useRef();*/

export default function searchHorse  ()  {
  const router =useRouter()
  const [slug, setSLug] = useState({})
  const [data,setHorseData]=useState([]);
  const getHorseData=()=>{
    axios.get('http://127.0.0.1:5000/api/horseInfo').then (function (response){
      console.log(response.data);
      setHorseData(response.data)
      }).catch(function(error){console.log(error)}) };
  getHorseData()
  

  var dataSource=[];
  for (var i=0;i<data.length;i++){
    dataSource.push(data[i]);
  }

  const [filteredInfo, setFilteredInfo] = React.useState({});
  const [sortedInfo, setSortedInfo] = React.useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'BirthDate',
    });
  };
  const setWinningDateSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'WinningDate',
    });
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'Horse',
      key: 'name',
      filters: [
        {
          text: 'Havre de Grace',
          value: 'Havre de Grace',
        },
        {
          text: 'Hills and Stars',
          value: 'Hills and Stars',
        },
      ],
      filteredValue: filteredInfo.name || null,
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'Age',
      key: 'Age',
      sorter: (a, b) => a.Age - b.Age,
      sortOrder: sortedInfo.columnKey === 'Age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'WinningDate',
      dataIndex: 'Date',
      key: 'WinningDate',
      ellipsis: true,
    },
    {
      title: 'Surf',
      dataIndex: 'Surface',
      key: 'surf',
      filters: [
        {
          text: 'Turf',
          value: '2',
        },
        {
          text: 'Dirt',
          value: '1',
        },
      ],
      filteredValue: filteredInfo.surf || null,
      onFilter: (value, record) => record.surf.includes(value),
      ellipsis: true,
    },
    {
      title: 'DistanceFurlongs',
      dataIndex: 'Distance Furlongs',
      key: 'distanceFurlongs',
      filteredValue: filteredInfo.distanceFurlongs || null,
      onFilter: (value, record) => record.distanceFurlongs.includes(value),
      sorter: (a, b) => a.distanceFurlongs - b.distanceFurlongs,
      sortOrder: sortedInfo.columnKey === 'distanceFurlongs' ? sortedInfo.order : null,
      ellipsis: true,
    }
  ];

  return (//Waiting to integrate with Menu component and pageHeader
      <>
      <Menu/>
      <Space direction="vertical"
    size="middle"
    style={{
      display: 'flex',
    }}>
      <ReactPlayer style = {{display:'flex', margin:"0 auto",marginTop: "10px", width:"70%"}}controls={true} url='https://www.youtube.com/watch?v=VEddhvKNKrQ'/> 
      </Space>
      <Space direction="horizontal"
    size="middle"
    style={{
      display: 'flex',
    }}>
      <Button onClick={setAgeSort}>Sort age</Button>
      <Button onClick={clearFilters}>Clear filters</Button>
      <Button onClick={setWinningDateSort}>Sort by Winning Date</Button>
      <Button onClick={clearAll}>Clear filters and sorters</Button>
    </Space>
    
    <Table dataSource={dataSource}columns={columns}onChange={handleChange} />

    </>
  );
};
