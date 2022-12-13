import { Avatar, Button, Comment, Form, Input, List } from 'antd'
import moment from 'moment'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import useToken from './useToken'
import ScrollableDisplayPostsForum from './scrollable_display_posts_forum'
const { TextArea } = Input

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

const PostAMessageForum = () => {
  const [messages, setMessages] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')
  const { token, removeToken, setToken } = useToken()
  const [username, setUserName] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const updatedData = []

  const loadMessages = () => {
    axios.get('http://127.0.0.1:5000/api/messages')
      .then(function (response) {
        console.log(response.data)
        setData(response.data)
        setLoading(false)
      })
      .catch(() => {
        console.log(error)
        setLoading(false)
      })
  }

  const handleSubmit = () => {
    console.log('here we are')
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
          'Content-Type': 'application/x-www-form-urlencoded', // seems only pass data as string type
          Authorization: 'Bearer ' + token
        }
      }
      )
        .then(function (response) {
          console.log(response.data)
          setData([])
          loadMoreData() // update messages display after posting
          // Perform action based on response
        })
        .catch(function (error) {
          console.log(error)
          alert('please login before posting a comment!')
          Router.push('/auth/login')
        })
    }, 1000)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    loadMessages()
  }

  useEffect(() => {
    loadMoreData()
    const username = localStorage.getItem('username')
    setUserName(username)
  }, [])

  return (
    <>
    <ScrollableDisplayPostsForum loadMessages= {loadMessages} loadMoreData={loadMoreData} data = {data}/>
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
