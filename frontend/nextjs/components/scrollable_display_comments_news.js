import { Avatar, Divider, List, Skeleton } from 'antd'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { UserOutlined } from '@ant-design/icons'

// display news comments in a scrollable window
export default function ScrollableDisplayCommentsNews ({
  data = []
}) {
  return (
    <div
      id="scrollableDiv"
      style={{
        width: 400,
        height: 500,
        overflow: 'auto',
        padding: '0 16px',
        border: '0.5px solid',
        borderColor: '#a14845',
        backgroundColor: '#faf6f6',
        margin: '0px auto',
        marginTop: '60px',
        marginLeft: '100px'
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
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.count}>
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
