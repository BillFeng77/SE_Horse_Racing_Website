import { Button, Comment, Form, Input } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
const { TextArea } = Input
/**
 * @param {function} onChange1
 * @param {function} onSubmit
 * @param {boolean} submitting - submitting state
 * @param {messages} messages - the return message from backend
 * @param {string} value1 - announcement content
 */
const Editor = ({ onChange1, onSubmit, submitting, value1, messages }) => (
  <>
  <Form.Item>
    <p>Announcement</p>
   <TextArea rows={3} onChange={onChange1} value={value1} style={{ marginTop: '7px', border: '1.5px solid rgba(136, 50, 47, 0.4)' }}/>
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

      axios.post('http://127.0.0.1:5000/api/announcements', {
        content: value1
      }
      , {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // seems only pass data as string type
        }
      }
      )
        .then(function (response) {
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
