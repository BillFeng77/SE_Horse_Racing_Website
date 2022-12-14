import { Avatar, Divider, List, Skeleton } from 'antd'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { DislikeFilled, LikeFilled, UserOutlined } from '@ant-design/icons'

// display messages in a scrollable window, handle like and dislike functions
export default function ScrollableDisplayPostsForum ({
  loadMessages,
  data
}) 
{
 // handle like function, update data for display 
  const handleLikeClick = (id) => {
    axios.post(`http://127.0.0.1:5000/api/messages/${id}/likes`)
      .then(function (response) {
        console.log('posted: ', response.data)
      }
      )
    setTimeout(() => {
      loadMessages()
    }, 500)
  }

  // handle dislike function, update data for display 
  const handleDislikeClick = (id) => {
    axios.post(`http://127.0.0.1:5000/api/messages/${id}/dislikes`)
      .then(function (response) {
        console.log('posted: ', response.data)
      }
      )
    setTimeout(() => {
      loadMessages()
    }, 500)
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
        margin: '0px auto'
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1
            }}
            active
          />
        }
        endMessage={<Divider plain style={{ color: 'rgba(0, 0, 0, 0.45)' }}>END</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
        itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
            key={item.id}
            actions = {
             [<span onClick={() => { handleLikeClick(item.id) }}> <LikeFilled style={{ color: '#a14845', cursor: 'pointer' }}></LikeFilled><span> {item.likes}</span></span>,
             <span onClick={() => { handleDislikeClick(item.id) }}> <DislikeFilled style={{ cursor: 'pointer' }}></DislikeFilled><span> {item.dislikes}</span></span>]
          }
            >
              <List.Item.Meta
                avatar={<Avatar size="large" icon={<UserOutlined />} />}
                title={item.userName}
                description={item.content}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>

    </div>
  )
};
