import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Router from 'next/router'

function Login(props){
    const [error, setError] = useState(false)
    const [emailEmpty, setEmailEmpty] = useState(false)
    const [passwordEmpty, setPasswordEmpty] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    function handleChange(event){
        setError(false)
        const {value, name} = event.target
        if (name=='email') {
            setEmail(value)
        }
        if (name=='password') {
            setPassword(value)
        }
    }

    useEffect(()=>{
        if (email.length!=0){
            setEmailEmpty(false)
        }
        if (password.length!=0){
            setPasswordEmpty(false)
        }
    },[email,password])

    async function handleSubmit(event){
        setPasswordEmpty(false)
        setEmailEmpty(false)
        await axios.post("http://127.0.0.1:5000/api/usertoken",{
            email:email,
            password:password
          },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
          )
          .then((response) => {
            props.setToken(response.data.access_token)
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('usertype',response.data.usertype)
            setError(false)
            Router.push('/')
          }).catch((error) => {
            if (error.response) {
              if (password.length==0){
                setPasswordEmpty(true)
              }
              if (email.length==0){
                setEmailEmpty(true)
              }
              if (email.length!=0 && password.length!=0){
                setError(true)
              }
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
              }
          })
        event.preventDefault()
    }

    return (
        <>
        <Box
            //sx={{width:200}}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            component="form"
            justify="center"
            noValidate
            autoComplete="off"
            >
            <h1 style={{color:'darkred'}}>Login For More Fun!</h1>
            <TextField 
            id="standard-basic" 
            onChange={handleChange}
            error={emailEmpty==true}
            helperText={emailEmpty === true ? 'Empty field!':''}
            value={email} 
            label="Email" 
            name="email" 
            variant="standard" 
            />
            <br/>
            <TextField 
            id="standard-basic" 
            onChange={handleChange} 
            error={passwordEmpty==true}
            helperText={passwordEmpty === true ? 'Empty field!':''}
            value={password}
            label="Password" 
            name="password" 
            variant="standard" 
            />
            { error==false
            ?<p></p>
            :(
                <p style={{color:'red'}}>email or password is incorrect!</p>
            )
            }
            <Button color='primary' variant='contained' sx={{marginTop:2}} onClick={handleSubmit}>Login</Button>
            <Link sx={{marginTop:4}} href="/auth/register">No account? Please register here</Link>
        </Box>
        </>
    )
}

export default Login