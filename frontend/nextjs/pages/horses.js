import searchHorse from '../components/searchByFilter';
import Menu from '../components/menu';
import React , { useCallback, useLayoutEffect, useRef,useState }from "react";
import {Button,Table,Space} from 'antd';
import {Layout} from'antd';
const {Footer}=Layout;
function Horsespage(){
    const data = [
        {key:"1",
          Name: 'James',
          BirthDate: 200316,
          WinningDate: 19970826,
          RaceName: 'Delby',
          Country:'American',
          Surf:'Surf',
          DistanceFurlongs:150,

        },{
        key:"2",
        Name: 'MEssi',
        BirthDate: 200396,
        WinningDate: 19980826,
        RaceName: 'Delby',
        Country:'Australia',
        Surf:'Surf',
        DistanceFurlongs:600,}];
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
  }];
    return (
        <>
        <Menu />
        <Space>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={setWinningDateSort}>Sort by Winning Date</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
      <Footer style = {{marginTop: "300px", height:"300px", backgroundColor: "#88322F"}}>
    </Footer>
        </>
    )
}

export default Horsespage