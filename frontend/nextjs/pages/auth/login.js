
import Menu from '../../components/menu'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'

function loginpage(){
    return (
        <>
        <Menu />
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
            <TextField id="standard-basic" label="Email" variant="standard" />
            <br/>
            <TextField id="standard-basic" label="Password" variant="standard" />
            <Button color='primary' variant='contained' sx={{marginTop:4}}>Login</Button>
            <Link sx={{marginTop:4}} href="#">No account? Please register here</Link>
        </Box>
        </>
    )
}

export default loginpage