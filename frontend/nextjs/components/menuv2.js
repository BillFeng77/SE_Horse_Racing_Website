import Link from 'next/link';
import {Dropdown,Space} from 'antd';
import styles from '../styles/menu.module.css';
import useToken from './useToken';
import { useState ,useEffect} from 'react';
import Router from 'next/router';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import axios from 'axios';
import Logout from '@mui/icons-material/Logout';
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from '@mui/material/ListItemIcon';
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';
import ForumIcon from '@mui/icons-material/Forum';
import LoginIcon from '@mui/icons-material/Login';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';


const Selfmenu=()=> {
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    const { token, removeToken, setToken } = useToken()
    
    const [username, setUserName] = useState("")

    useEffect(() => {
        const data = localStorage.getItem('username')
        setUserName(data)
    }, [])
    

    function logMeOut() {
        axios({
          method: "POST",
          url:"http://127.0.0.1:5000/api/logout",
        })
        .then((response) => {
           removeToken()
           localStorage.removeItem('username')
           window.location.reload()
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}
    return (
        <React.Fragment>
        <Box sx={{ mx:"auto",display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Typography sx={{ minWidth: 250 }}><HomeIcon/><Link href="/"><a>Home </a></Link></Typography>
          <Typography sx={{ minWidth: 250 }}><BedroomBabyIcon/><Link href="/horses"><a>Horse </a></Link></Typography>
          <Typography sx={{ minWidth: 250 }}><ForumIcon/><Link href="/forum"><a>Forum </a></Link></Typography>
          <Typography sx={{ minWidth: 250 }}><CalendarMonthIcon/><Link href="/calendar"><a>Calendar</a></Link></Typography>
          {/*username=="" && username==undefined&&*/<Typography sx={{ minWidth: 200 }}><AdminPanelSettingsIcon/><Link href="/auth/login"><a>Admin Login </a></Link></Typography>
          &&<Typography sx={{ minWidth: 200 }}><LoginIcon/><Link href="/auth/login"><a>User Login </a></Link></Typography>
          }
          <Typography sx={{ minWidth: 200 }}><AdminPanelSettingsIcon/><Link href="/auth/login"><a>Admin Login </a></Link></Typography>
          
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {username!=="" && username!==undefined &&(<Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={logMeOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <Link href=''>
            Logout
            </Link>
          </MenuItem>
        </Menu>)};
      </React.Fragment>
    );
    
}
export default Selfmenu