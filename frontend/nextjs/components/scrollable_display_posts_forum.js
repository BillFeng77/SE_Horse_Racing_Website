import { Avatar, Divider, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'

const ScrollableDisplayPostsForum = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    axios.get('http://127.0.0.1:5000/messages')
        .then(function(response){
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        })
        .catch(() =>{
            console.log(error);
            setLoading(false);
    })
    // fetch('http://127.0.0.1:5000/messages')
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 5}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>END</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.userName}>
              <List.Item.Meta
                avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                title={<a href="https://ant.design">{item.userName}</a>}
                description={item.content}
              />
              {/* <div>Content</div> */}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
export default ScrollableDisplayPostsForum;