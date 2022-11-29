import Layout from '../components/layout';
import Menu from '../components/menu';
import React , { useCallback, useLayoutEffect, useRef,useState }from "react";
import {Button,Table,Space} from 'antd';
import axios from 'axios'; 

const getHorseData=()=>{
  const[value0,setID]=useState('')
  const [value1,setName]=useState('')
  const [value2,setBirthDate]=useState('')
  const [value3,setWinningDate]=useState('')
  const [value4,setRaceName]=useState('')
  const [value5,setCountry]=useState('')
  const [value6,setSurf]=useState("")
  const [value7,setDistanceFurlongs]=useState("")
  axios.get('http://127.0.0.1:5000/api/horseInfo', {
    key:value0,
    Name:value1,
    BirthDate:value2,
    WinningDate:value3,
    RaceName:value4,
    Country:value5,
    Surf:value6,
    distanceFurlongs:value7,
}).then (function (response){console.log(response.data);
  setID(response.data);
  setName(response.data);
  setBirthDate(response.data);
  setWinningDate(response.data);
  setRaceName(response.data);
  setCountry(response.data);
  setSurf(response.data);
  setDistanceFurlongs(response.data)
    }).catch(function(error){console.log(error)}) };

const data=getHorseData;

export default function searchHorse  ()  {
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
      dataIndex: 'name',
      key: 'name',
      filters: [
        {
          text: 'LeBron',
          value: 'LeBron',
        },
        {
          text: 'Jimmy',
          value: 'Jimmy',
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
      title: 'BirthDate',
      dataIndex: 'BirthDate',
      key: 'BirthDate',
      sorter: (a, b) => a.BirthDate - b.BirthDate,
      sortOrder: sortedInfo.columnKey === 'BirthDate' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'WinningDate',
      dataIndex: 'WinningDate',
      key: 'WinningDate',
      ellipsis: true,
    },
    {
      title: 'Surf',
      dataIndex: 'Surf',
      key: 'surf',
      filters: [
        {
          text: '',
          value: '',
        },
        {
          text: '',
          value: '',
        },
      ],
      filteredValue: filteredInfo.surf || null,
      onFilter: (value, record) => record.surf.includes(value),
      ellipsis: true,
    },
    {
      title: 'DistanceFurlongs',
      dataIndex: 'DistanceFurlongs',
      key: 'distanceFurlongs',
      filters: [
        {
          text: '',
          value: '',
        },
        {
          text: '',
          value: '',
        },
      ],
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
      <Space>
      <Button onClick={setAgeSort}>Sort age</Button>
      <Button onClick={clearFilters}>Clear filters</Button>
      <Button onClick={setWinningDateSort}>Sort by Winning Date</Button>
      <Button onClick={clearAll}>Clear filters and sorters</Button>
    </Space>
    <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};
