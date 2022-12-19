import { Button, Comment, Form, Input } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
const { TextArea } = Input

// Editor performing prepare and editing news
const Editor = ({ onChange1, onChange2, onChange3, onSubmit, submitting, value1, value2, value3, messages }) => (
  <>
  <Form.Item>
    <p>News Title</p>
   <Input onChange={onChange1} value={value1} style={{ marginTop: '7px', border: '1.5px solid rgba(136, 50, 47, 0.4)' }}/>
   </Form.Item>
   <Form.Item>
    <p>News Information</p>
    <TextArea rows={2} onChange={onChange2} value={value2} placeholder="author | date | source" style={{ marginTop: '7px', border: '1.5px solid rgba(136, 50, 47, 0.4)' }}/>
   </Form.Item>
    <Form.Item>
    <p>Content</p>
      <TextArea rows={6} onChange={onChange3} value={value3} style={{ marginTop: '7px', border: '1.5px solid rgba(136, 50, 47, 0.4)' }}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" style={{ fontWeight: '500' }}>
        Publish
      </Button>
      <p
        style={{
          fontSize: '14px',
          margin: '10px 0px',
          color: '#C19090'
        }}>{messages}</p>
    </Form.Item>

  </>
)

// Publish the news in Editor into database
const PublishANews = () => {
  const [messages, setMessages] = useState(' ')
  const [submitting, setSubmitting] = useState(false)
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [value3, setValue3] = useState('')

  const handleSubmit = () => {
    if (!value1 || !value2 || !value3) return
    setSubmitting(true)
    setMessages(' ')
    setTimeout(() => {
      setSubmitting(false)
      setValue1('')
      setValue2('')
      setValue3('')

      axios.post('http://127.0.0.1:5000/api/news', {
        title: value1,
        publishInformation: value2,
        content: value3
      }
      , {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      )
        .then(function (response) {
          console.log(response.data)
          setMessages(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }, 1000)
  }

  const handleChange1 = (e) => {
    setValue1(e.target.value)
    setMessages(' ')
  }

  const handleChange2 = (e) => {
    setValue2(e.target.value)
    setMessages(' ')
  }

  const handleChange3 = (e) => {
    setValue3(e.target.value)
    setMessages(' ')
  }

  return (
    <>
      <Comment
      style = {{
        width: 1000,
        margin: '0px auto'
      }}
        content={
          <Editor
            onChange1={handleChange1}
            onChange2={handleChange2}
            onChange3={handleChange3}
            onSubmit={handleSubmit}
            submitting={submitting}
            value1={value1}
            value2={value2}
            value3={value3}
            messages = {messages}
          />
        }
      />
      <div>

        </div>
    </>
  )
}
export default PublishANews
