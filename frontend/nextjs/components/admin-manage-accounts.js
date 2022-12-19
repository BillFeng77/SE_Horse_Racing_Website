import { Button, Comment, Form, Input, message, Popconfirm } from 'antd'

import axios from 'axios'
import React, { useState } from 'react'

const cancel = (e) => {
  console.log(e)
}

const Editor = ({ onChange1, onSubmit, submitting, value1, messages }) => (
  <>
  <Form.Item>
    <p>User Name</p>
   <Input onChange={onChange1} value={value1} style={{ marginTop: '7px', border: '1.5px solid rgba(136, 50, 47, 0.4)' }}/>
   </Form.Item>
    <Form.Item>
    <Popconfirm
    title= {`Are you sure to terminate account ${value1} ?`}
    onConfirm={onSubmit}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <Button htmlType="submit" loading={submitting} type="primary" style={{ fontWeight: '500' }}>
        Terminate Account
      </Button>
  </Popconfirm>

      <p
        style={{
          fontSize: '14px',
          margin: '10px 0px',
          color: '#C19090'
        }}>{messages}</p>
    </Form.Item>

  </>
)

const PublishAnAnnouncement = () => {
  const [messages, setMessages] = useState(' ')
  const [submitting, setSubmitting] = useState(false)
  const [value1, setValue1] = useState('')

  const handleSubmit = () => {
    if (!value1) return
    setSubmitting(true)
    setMessages(' ')
    setTimeout(() => {
      setSubmitting(false)
      setValue1('')

      axios.delete(`http://127.0.0.1:5000/api/users/${value1}`
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
    }, 500)
  }

  const handleChange1 = (e) => {
    setValue1(e.target.value)
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
  )
}
export default PublishAnAnnouncement
