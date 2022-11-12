import { Avatar, Divider, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'

export default function ScrollableDisplayPostsForum({
  loadMoreData,
  data = [],
}) {
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  // const loadMoreData = () => {
  //   if (loading) {
  //     return;
  //   }
  //   setLoading(true);
  //   axios.get('http://127.0.0.1:5000/messages')
  //       .then(function(response){
  //           console.log(response.data);
  //           setData(response.data);
  //           setLoading(false);
  //       })
  //       .catch(() =>{
  //           console.log(error);
  //           setLoading(false);
  //   })

    // fetch('http://127.0.0.1:5000/messages')
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  // };

  // if (reload == true) {
  //   console.log("reload");
  //   setLoading(true);
  //   axios.get('http://127.0.0.1:5000/messages')
  //       .then(function(response){
  //           console.log(response.data);
  //           setData(response.data);
  //           setLoading(false);
  //       })
  //       .catch(() =>{
  //           console.log(error);
  //           setLoading(false);
  //   })
  //   reload = False;
  // };

    // const updateMessages = (message = getMessage()) => {
    //   setData([message, ...data])
    //   if (!value) return;
    //   setSubmitting(true);
    //   setTimeout(() => {
    //     setSubmitting(false);
    //     setValue('');
        
    //   axios.post('http://127.0.0.1:5000/messages', {
    //       userName: "jny223",
    //       content: value,
    //       dislikes: 0,
    //       likes: 0,
    //       count: 0
    //     }
    // //   ,{
    // //     headers: {
    // //         'Content-Type': 'application/x-www-form-urlencoded'
    // //       }
    // //   }
    //   )
    //         .then(function(comment){
    //             console.log(comment.data);
    //             setData([comment, ...data])
    //             // setMessages(response.data)
    //    //Perform action based on response
    //     })
    //     .catch(function(error){
    //         console.log(error);
    // })

    // }, 1000);
  // };

  // useEffect(() => {
  //   loadMoreData();
  // }, []);

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
        endMessage={<Divider plain style={{color: 'rgba(0, 0, 0, 0.45)'}}>END</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.count}>
              <List.Item.Meta
                avatar={<Avatar src='https://joeschmoe.io/api/v1/1' />}
                title={item.userName}
                description={item.content}
              />
              {/* <div>Content</div> */}
            </List.Item>
          )}
        />
      </InfiniteScroll>
      {/* <PostAMessageForum handleSubmit={addAMessage}/> */}
    </div>
  );
};
// export default ScrollableDisplayPostsForum;