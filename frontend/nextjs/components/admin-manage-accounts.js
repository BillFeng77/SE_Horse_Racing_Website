import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
const { TextArea } = Input;
import { message, Popconfirm } from 'antd';

// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//     renderItem={(props) => <Comment {...props} />}
//   />
// );


const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = (e) => {
  console.log(e);
  // message.error('Click on No');
};

const Editor = ({ onChange1, onSubmit, submitting, value1, messages }) => (
  <>
  <Form.Item>
    <p>User Name</p>
   <Input onChange={onChange1} value={value1} style={{marginTop: '7px', border: '1.5px solid rgba(136, 50, 47, 0.4)'}}/>
   </Form.Item>
    <Form.Item>
    <Popconfirm
    title= {`Are you sure to terminate account ${value1} ?`}
    onConfirm={onSubmit}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <Button htmlType="submit" loading={submitting} type="primary" style={{fontWeight: '500'}}>
        Terminate Account
      </Button>
    {/* <a href="#">Delete</a> */}
  </Popconfirm>
      
      <p 
        style={{
        fontSize: '14px',
        margin: '10px 0px',
        color: '#C19090'
      }}>{messages}</p>
    </Form.Item>
    
  </>
);

const PublishAnAnnouncement = () => {
  const [messages, setMessages] = useState(' ');
  const [submitting, setSubmitting] = useState(false);
  const [value1, setValue1] = useState('');

  // const [loading, setLoading] = useState(false);


  const handleSubmit = () => {
    if (!value1) return;
    setSubmitting(true);
    setMessages(' ');
    setTimeout(() => {
      setSubmitting(false);
      setValue1('');

    //   setComments([
    //     ...comments,
    //     {
    //       author: 'Han Solo',
    //       avatar: 'https://joeschmoe.io/api/v1/random',
    //       content: <p>{value}</p>,
    //       datetime: moment('2016-11-22').fromNow(),
    //     },
    //   ]);

    axios.delete(`http://127.0.0.1:5000/api/users/${value1}`
      ,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'   // seems only pass data as string type
          }
      }
      )
            .then(function(response){
                console.log(response.data);
                setMessages(response.data);
                // setData([])
                // loadMoreData();  // update messages display after posting
       //Perform action based on response
        })
        .catch(function(error){
            console.log(error);
    })

    }, 500);
    
  };

  const handleChange1 = (e) => {
    setValue1(e.target.value);
    setMessages(' ');
  };


  return (
    <>
      <Comment 
      style = {{
        width: 1000,
        margin: '0px auto',
    }}
        // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <Editor
            onChange1={handleChange1}
            onSubmit={handleSubmit}
            submitting={submitting}
            value1={value1}
            messages = {messages}
          />
        }
      />
      <div>
        
        </div>
    </>
  );
};
export default PublishAnAnnouncement;