import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Router from 'next/router'

function Login(props){
    const [loginForm, setLoginForm] = useState({email:"",password:""})
    const [error, setError] = useState(false)
    function handleChange(event){
        const {value, name} = event.target
        setLoginForm(prevForm => ({
            ...prevForm, [name]: value})
    )}

    async function handleSubmit(event){
        await axios.post("http://127.0.0.1:5000/api/usertoken",{
            email:loginForm.email,
            password:loginForm.password
          },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
          )
          .then((response) => {
            props.setToken(response.data.access_token)
            localStorage.setItem('username', response.data.username)
            setError(false)
            Router.push('/')
          }).catch((error) => {
            if (error.response) {
              setError(true)
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
              }
          })

        setLoginForm(({
            email: "",
            password: ""}))
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
            <TextField id="standard-basic" onChange={handleChange} label="Email" name="email" variant="standard" />
            <br/>
            <TextField id="standard-basic" onChange={handleChange} label="Password" name="password" variant="standard" />
            { error==false
            ?<p></p>
            :(
                <p style={{color:'red'}}>email or password is incorrect!</p>
            )
            }
            <Button color='primary' variant='contained' sx={{marginTop:2}} onClick={handleSubmit}>Login</Button>
            <Link sx={{marginTop:4}} href="#">No account? Please register here</Link>
        </Box>
        </>
    )
}

export default Login