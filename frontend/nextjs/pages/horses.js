
import Menu from '../components/menu';
import Selfmenu from '../components/menuv2';
import React , { useState}from "react";
import {Button,Table,Space} from 'antd';
import axios from 'axios'; 

import ReactPlayer from'react-player/youtube';


export default function searchHorse  ()  {
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
  var nameFilter=[];
  for (var i=0;i<data.length;i++){
    nameFilter.push({"text":data[i].Horse,"value":data[i].Horse})
  }
  var raceNameFilter=[];
  for (var i=0;i<data.length;i++){
    raceNameFilter.push({"text":data[i].RaceName,"value":data[i].RaceName})
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
      columnKey: 'Age',
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
      filters: nameFilter,
      filteredValue: filteredInfo.name || null,
      filterSearch: true,
      onFilter: (value, record) => record.Horse.includes(value),
      ellipsis: true,
    },
    {
      title: 'RaceName',
      dataIndex: 'RaceName',
      key: 'RaceName',
      filters: raceNameFilter,
      filteredValue: filteredInfo.Racename || null,
      filterSearch: true,
      onFilter: (value, record) => record.RaceName.includes(value),
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
      onFilter: (value, record) => record.Surface.includes(value),
      ellipsis: true,
    },
    {
      title: 'DistanceFurlongs',
      dataIndex: 'DistanceFurlongs',
      key: 'distanceFurlongs',
      filteredValue: filteredInfo.DistanceFurlongs || null,
      onFilter: (value, record) => record.DistanceFurlongs.includes(value),
      sorter: (a, b) => a.DistanceFurlongs - b.DistanceFurlongs,
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
