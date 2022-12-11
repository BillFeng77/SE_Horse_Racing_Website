import Link from 'next/link';
import React from 'react';
import {Dropdown,Space} from 'antd';
import styles from '../styles/menu.module.css';
import useToken from './useToken';
import Router from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
export default function Menu() {
    const { token, removeToken, setToken } = useToken()
    const [usertype, setUserType] = useState(null)
    const [username, setUserName] = useState(null)

    useEffect(() => {
        const name = localStorage.getItem('username')
        const usertype = localStorage.getItem('usertype')
        setUserName(name)
        setUserType(usertype)
    }, [])
    

    function logMeOut() {
        axios({
          method: "POST",
          url:"http://127.0.0.1:5000/api/logout",
        })
        .then((response) => {
           removeToken()
           localStorage.removeItem('username')
           localStorage.removeItem('usertype')
           window.location.reload()
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}
    return (
        /*<Menu mode="horizontal" className={styles.header}title="Horse Racing">
            <li>
                <a>Horse racing</a>
            </li>
            <Menu.Item className={styles.item}>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </Menu.Item>
            <Menu.Item className={styles.item}>
                <Link href="/horses">
                    <a>Horse</a>
                </Link>
            </Menu.Item>
            <Menu.Item className={styles.item}>
                <Link href="/forum">
                    <a>Forum</a>
                </Link>
            </Menu.Item>
            <Menu.Item className={styles.item}>
                <Link href="/forum">
                    <a>Forum</a>
                </Link>
            </Menu.Item>
            <Menu.Item className={styles.item}>
                <Link href="/auth/login">
                    <a>Login</a>
                </Link>
            </Menu.Item>
            <Dropdown>
                
            </Dropdown>
            <Menu.SubMenu title="Hi user" className={styles.item}>
                <Menu.Item>
                    <Link href="/auth/logout">
                        <a>Logout</a>
                    </Link>
                </Menu.Item>
                <Menu>
                    <Link href="admin-manage-accounts">
                        <a>Admin management</a>
                    </Link>
                </Menu>
            </Menu.SubMenu>
        </Menu>*/
        <>
        <div className={styles.header}>
            <b className={styles.title}>Horseracing</b>
        <div className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link href="/calendar">
                        <a>Calendar</a>
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link href="/horses">
                        <a>Horse</a>
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link href="/forum">
                        <a>Forum</a>
                    </Link>
                </li>
            </ul>
        </div>

        <div className={styles.userName} style={{marginRight:"200px"}}>
            {username==null&&usertype==null&&(<div><Link href="/auth/login">
                        <a>Login</a>
                    </Link></div>)}
            { username!==null && usertype!==null
            ?(
                <div style={{display:"flex",flexDirection:"row"}}>
                <p style={{fontSize:"15px", marginRight:"15px"}}>Welcome, {username}!</p>
                { usertype=="admin"
                    ?(
                        <>
                        <Button variant='text' style={{marginRight:"15px"}}>
                            <Link href="/admin"><a>Admin</a></Link>
                        </Button>
                        </>
                    )
                    :<></>
                }
                <Button variant='text' onClick={logMeOut} className={styles.nav} style={{color:"#88322F"}}> 
                    Logout
                </Button>
                </div>
            )
            :<></>
            }
        </div>
        </div>
        </>
        
    );
}