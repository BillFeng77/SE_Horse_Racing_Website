import { Button, Comment, Form, Input} from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import useToken from './useToken'
import ScrollableDisplayPostsForum from './scrollable_display_posts_forum'
const { TextArea } = Input

// post (text box and button) implementation
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} style={{ border: '1.5px solid rgba(136, 50, 47, 0.4)' }}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" style={{ fontWeight: '500' }}>
        Post
      </Button>
    </Form.Item>
  </>
)

// handle get and post messages
const PostAMessageForum = () => {
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')
  const { token, removeToken, setToken } = useToken()
  const [username, setUserName] = useState(null)
  const [data, setData] = useState([])

  // get messages from db, update data for display
  const loadMessages = () => {
    axios.get('http://127.0.0.1:5000/api/messages')
      .then(function (response) {
        setData(response.data)
      })
      .catch(() => {
        console.log(error)
      })
  }

  // check login status and save messages to db on posting, update data for display
  const handleSubmit = () => {
    console.log(token)
    if (!value) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setValue('')

      axios.post('http://127.0.0.1:5000/api/messages', {
        userName: username,
        content: value
      }
      , {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + token
        }})
        .then(function (response) {
          console.log(response.data)
          setData([])
          loadMessages() // update comments display after posting
        })
        .catch(function (error) {
          console.log(error)
          alert('please login before posting a comment!')
          Router.push('/auth/login')
        })
    }, 1000)};

  // synchronize {value} when typing in the text box
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  // initiate data
  useEffect(() => {
    loadMessages()
    const username = localStorage.getItem('username')
    setUserName(username)
  }, [])

  return (
    <>
    <ScrollableDisplayPostsForum loadMessages= {loadMessages} data = {data}/>
      <Comment
      style = {{
        width: 1000,
        margin: '0px auto'
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
  )
}
export default PostAMessageForum
