import { Avatar, Divider, Space, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Comment, Tooltip } from 'antd';
import useItems from 'antd/lib/menu/hooks/useItems';

export default function ScrollableDisplayPostsForum({
  loadMoreData,
  loadMessages,
  data,
}) {

  const handleLikeClick =(id) =>{
    axios.post(`http://127.0.0.1:5000/api/messages/${id}/likes`)
    .then(function(response){
      console.log("posted: ",response.data);
    }
    )
setTimeout(() => {
  loadMessages();
}, 800);
  }

  const handleDislikeClick =(id) =>{
    axios.post(`http://127.0.0.1:5000/api/messages/${id}/dislikes`)
    .then(function(response){
      console.log("posted: ",response.data);
    }
    )
setTimeout(() => {
  loadMessages();
}, 800);
  }

  return (
    <div
      id="scrollableDiv"
      style={{
        width: 1000,
        height: 500,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
        margin: 50,
        margin: '0px auto',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 1}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain style={{color: 'rgba(0, 0, 0, 0.45)'}}>END</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
        itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item 
            key={item.id} 
            actions = {
             [<span onClick={()=>{handleLikeClick(item.id)}}> <LikeFilled style={{color:"#a14845", cursor:"pointer" }}></LikeFilled><span> {item.likes}</span></span>,
             <span onClick={()=>{handleDislikeClick(item.id)}}> <DislikeFilled style={{cursor:"pointer" }}></DislikeFilled><span> {item.dislikes}</span></span>]
          }
            >
              <List.Item.Meta
                avatar={<Avatar src='https://joeschmoe.io/api/v1/1' />}
                title={item.userName}
                description={item.content}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
      
    </div>
  );
};
