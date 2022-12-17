import Menu from '../../components/menu'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import PasswordStrengthBar from 'react-password-strength-bar'

/**
 * /register page
 */
function registerPage () {
  const [error, setError] = useState(false)
  const [username, setUserName] = useState('')
  const [userNameEmpty, setUserNameEmpty] = useState(false)
  const [email, setEmail] = useState('')
  const [emailEmpty, setEmailEmpty] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordEmpty, setPasswordEmpty] = useState(false)
  const [usertype, setUserType] = useState('user')

  /**
   * update the input of usertype
   * @param {object} event - event.target.value is the value that user select
   */
  const handleSelect = (event) => {
    setUserType(event.target.value)
  }

  /**
   * update the inputs of username/email/password
   * @param {object} event - event.target.value is the value that user input, event.target.name is what the user input is
   */
  function handleChange (event) {
    setError(false)
    const { value, name } = event.target
    if (name === 'username') {
      setUserName(value)
    }
    if (name === 'email') {
      setEmail(value)
    }
    if (name === 'password') {
      setPassword(value)
    }
  }

  useEffect(() => {//cancel empty message
    if (email.length !== 0) {
      setEmailEmpty(false)
    }
    if (password.length !== 0) {
      setPasswordEmpty(false)
    }
    if (username.length !== 0) {
      setUserNameEmpty(false)
    }
  }, [email, password, username])
  
  /**
   * submit register information
   * @function
   */
  async function handleSubmit (event) {
    setPasswordEmpty(false)
    setEmailEmpty(false)
    setUserNameEmpty(false)
    if (password.length === 0) {
      setPasswordEmpty(true)
    }
    if (email.length === 0) {
      setEmailEmpty(true)
    }
    if (username.length === 0) {
      setUserNameEmpty(true)
    }
    if (password.length !== 0 && email.length !== 0 && username.length !== 0) {
      await axios.post('http://127.0.0.1:5000/api/register', {
        username,
        email,
        password,
        usertype
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      )
        .then((response) => {
          setError(false)
          Router.push('/auth/login')
          alert('successfully registered!')
        }).catch((error) => {
          if (error.response) {
            if (password.length === 0) {
              setPasswordEmpty(true)
            }
            if (email.length === 0) {
              setEmailEmpty(true)
            }
            if (username.length === 0) {
              setUserNameEmpty(true)
            }
            setError(true)
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
          }
        })
    }
    event.preventDefault()
  }
  return (
        <>
        <Menu/>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            component="form"
            justify="center"
            noValidate
            autoComplete="off"
            >
            <h1 style={{ color: 'darkred' }}>Register Here!</h1>
            <TextField
            id="standard-basic"
            onChange={handleChange}
            error={userNameEmpty === true}
            helperText={userNameEmpty === true ? 'Empty field!' : ''}
            value={username}
            label="Username"
            name="username"
            variant="standard"
            />
            <br/>
            <TextField
            id="standard-basic"
            onChange={handleChange}
            error={emailEmpty === true}
            helperText={emailEmpty === true ? 'Empty field!' : ''}
            value={email}
            label="Email"
            name="email"
            variant="standard"
            />
            <br/>
            <TextField
            id="standard-basic"
            onChange={handleChange}
            error={passwordEmpty === true}
            helperText={passwordEmpty === true ? 'Empty field!' : ''}
            value={password}
            label="Password"
            name="password"
            type="password"
            variant="standard"
            />
            <PasswordStrengthBar style={{ width: 160 }} password={password} />
            <FormControl variant='standard' sx={{ marginTop: 3, width: 200 }}>
            <InputLabel id="demo-simple-select-label">userType</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={usertype}
                label="Age"
                onChange={handleSelect}
            >
                <MenuItem value={'user'}>User</MenuItem>
                <MenuItem value={'admin'}>Admin</MenuItem>
            </Select>
            </FormControl>
            { error === false
              ? <p></p>
              : (
                <p style={{ color: 'red' }}>Account already existed!</p>
                )
            }
            <Button color='primary' variant='contained' sx={{ marginTop: 2 }} onClick={handleSubmit}>Register</Button>
        </Box>
        </>
  )
}
export default registerPage
