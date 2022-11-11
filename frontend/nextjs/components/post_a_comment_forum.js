import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import axios from 'axios'
import React, { useState } from 'react';
const { TextArea } = Input;

// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//     itemLayout="horizontal"
//     renderItem={(props) => <Comment {...props} />}
//   />
// );

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Post
      </Button>
    </Form.Item>
  </>
);

const PostAMessageForum = () => {
  const [messages, setMessages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
    //   setComments([
    //     ...comments,
    //     {
    //       author: 'Han Solo',
    //       avatar: 'https://joeschmoe.io/api/v1/random',
    //       content: <p>{value}</p>,
    //       datetime: moment('2016-11-22').fromNow(),
    //     },
    //   ]);

    axios.post('http://127.0.0.1:5000/messages', {
        userName: "jny223",
        content: value,
        dislikes: 0,
        likes: 0,
        count: 0
      })
            .then(function(response){
                console.log(response.data)
                // setMessages(response.data)
       //Perform action based on response
        })
        .catch(function(error){
            console.log(error);
    })

    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      {/* {messages.length > 0 && <CommentList messages={messages} />} */}
      <Comment
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};
export default PostAMessageForum;