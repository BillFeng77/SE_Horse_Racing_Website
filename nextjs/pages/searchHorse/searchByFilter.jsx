import React , { useCallback, useLayoutEffect, useRef,useState }from "react";
import {Button,Table,Space} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Link, useIntl, useModel, useRequest } from 'umi';

//Call API to get Data
//Add verification after login part done
const [userState,getUserState]=React.useState("user")

const data = [
  {
    Name: ,
    BirthDate: ,
    WinningDate: ,
    Race Name: ,
    Country:
    Surf:
    DistanceFurlongs:
  },
  
];
const searchHorse = () => {
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
      <PageContainer>
        <Space>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={setWinningDateSort}>Sort by Winning Date</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
      </PageContainer>
    );
  };


export default searchHorse;

//</PageContainer>function filter(){
  //  return <Horse {...horseData}/>;
//}
//export default filter
/*const selectHorse=()=>{
    ...
}*/
/*function Horse(props){
    const {
        horseracing,
        navbarLInkPlace1,
        navbarLInkHorse,
        navbarLInkPlace2,
        navbarLInkLogin,
        text1,
        hiUser,
        text2,
        displaySection11Props,
        displaySection12Props,
    }=props;
    return (
        <div className="container-center-horizontal">
            <div className="horse screen">
                <div className="flex-row">
                    <div className="horse-racing manrope-bold-black-20px">
                        {horseracing}
                    </div>
                    <div className="navbar">
                        <div className="navbar-link manrope-bold-black-20px">
                            {navbarLInkPlace1}
                        </div>
                        <div className="navbar-link manrope-bold-black-20px">
                            {navbarLInkHorse}
                        </div>
                        <div className="navbar-link manrope-bold-black-20px">
                            {navbarLInkPlace2}
                        </div>
                        <div className="navbar-link manrope-bold-black-20px">
                            {navbarLInkLogin}
                        </div>
                    </div>
                    <div className="overlap-group">
                        <img className="icon-search" src="icon.svg" alt="icon-search" />
                        <div className="text roboto-normal-ship-gray-17px">
                            {text1}
                        </div>
                    </div>
                    <div className="hi-jiani manrope-bold-au-chico-20px">
                        {hiJiani}
                        
                    </div>
                </div>
                <div className="filter-search">
                    <img className="icon-search-1" src="-icon-search.svg" alt="icon-search"/>
                    <h1 className="text-1">
                        {text2}
                    </h1>
                </div>
                <DisplaySection1 {...displaySection11Props}/>
                <DisplaySection2 {...displaySection12Props}/>

            </div>
        </div>
    );
}

function DisplaySection1(props){
    const {className, frame271Props, column1Props,frame272Props,column2Props,frame273Props,column3Props,column4Props}=props;
    return (
        <div className={'display-section1 ${className ||""} '}>
        <div className="overlap-group-1">
            <div className="overlap-group-2">
                <div className="rectangle-2615"></div>
                    <div className="rectangle-2616"></div>
                        <div className="rectangle-2617"></div>
                            <div className="rectangle-2618"></div>
                                <div className="rectangle-2618"></div>
                                    <div className="rectangle-2619"></div>
                                        <div className="rectangle-2621"></div>
                                            <div className="rectangle-2620"></div>
                                                <div className="rectangle-2614"></div>
                                                <img className="line-4" src="line-4.svg" alt="Line 4"/>
        </div>
        <Column />
        <div className="horse3">
            <Frame27 horse21={frame271Props.horse21}/>
            <Column className={column1Props.className}/>
        </div>
        <div className="horse4">
            <Frame27 horse21={frame272Props.horse21}/>
            <Column className={column2Props.className}/>
        </div>
        <div className="horse2">
            <Frame27 horse21={frame273Props.horse21}/>
            <Column className={column3Props.className}/>
        </div>
        <div className="horse1">
            <div className="horse-image1"></div>
            <Column className={column4Props.className}/>
        </div>
        </div>
        </div>
    );
}
function Column(props){
    const{className}=props;
    return (
        <div className={'column-1 ${className || ""}'} onClick={selectHorse}>
            <div className="place manrope-bold-white-17px">
                Name
            </div>
            <div className="birth-date manrope-bold-burnt-umber-17px">
                Birth Date
            </div>
            <div className="winning-date manrope-bold-white-17px">
                Wining Date
            </div>
            <div className="race-name manrope-bold-burnt-umber-17px">
                Race Name
            </div>
            <div className="country manrope-bold-white-17px">
                Country
            </div>
            <div className="surf manrope-bold-burnt-umber-17px">
                Surf
            </div>
            <div className="distance-furlongs manrope-bold-white-17px">
                Distance Furlongs
            </div>  
        </div>
    );
}
function Frame27(props){
    const {horse21}=props;
    return(
        <div className="horse-image">
            <img className="horse-1" src={horse21} alt="horse3 1" />
        </div>
    );
}

const frame271Data={
    horse21:"3-1.png",
};

const column2Data={
    className:"horse-info3",
};

const frame272Data={
    horse21:"4-1.png",
};

const column3Data={
    className:"horse-info4",
};

const displaySection11Data={
    frame271Props:frame271Data,
    column1Props:column2Data,
    frame272Props:frame272Data,
    column2Props:column3Data,
    frame273Props:frame273Data,
    column3Props:column4Data,
    column4Props:column5Data,
};

const horsedata={
    horseracing:"HorseRacing",
    navbarLinkPlace1:"Home",
    navbarLinkHorse:"Horse",
    navbarLinkPlace2:"Forum",
    navbarLinkLogIn:"Log in",
    text1:"Search News",
    hiJiani:"Hi,Jiani",
    text2:"Filter search",
    displaySection11Props:displaySection11Data,
}
