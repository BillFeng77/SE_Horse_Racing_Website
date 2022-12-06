import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import useToken from './useToken';
import ScrollableDisplayCommentsNews from './scrollable_display_comments_news';
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} placeholder = {"Leave your comment here"} onChange={onChange} value={value} style={{border: '1.5px solid rgba(136, 50, 47, 0.4)', backgroundColor:"#faf6f6",}}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" style={{fontWeight: '500'}}>
        Post
      </Button>
    </Form.Item>
  </>
);

const PostACommentNews = ({news_id}) => {
  const [messages, setMessages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const { token, removeToken, setToken } = useToken()

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const updatedData = []

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');

    axios.post(`http://127.0.0.1:5000/api/${news_id}/comments`, {
        userName: "jny223",
        content: value,
      }
      ,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',   // seems only pass data as string type
            'Authorization': 'Bearer ' + token
          }
      }
      )
            .then(function(response){
                console.log(response.data);
                setData([])
                loadMoreData();  // update messages display after posting
       //Perform action based on response
        })
        .catch(function(error){
          console.log(error);
          alert('please login before posting a comment!')
          Router.push('/auth/login')
    })   

    }, 1000);
    
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    axios.get(`http://127.0.0.1:5000/api/${news_id}/comments`)
        .then(function(response){
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        })
        .catch(() =>{
            console.log(error);
            setLoading(false);
    })
  };

   useEffect(() => {
     loadMoreData();
  }, []);

  return (
    <>
    <ScrollableDisplayCommentsNews loadMoreData={loadMoreData} data = {data}/>
      {/* {messages.length > 0 && <CommentList messages={messages} />} */}
      <Comment 
      style = {{
        width: 400,
         margin: '0px auto',
         marginLeft:"100px",
        // display: "flex",
    }}
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
export default PostACommentNews;