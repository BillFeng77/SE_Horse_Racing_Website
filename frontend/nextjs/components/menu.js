import Link from 'next/link';

import styles from '../styles/menu.module.css';
import useToken from './useToken';
import Router from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Menu() {
    const { token, removeToken, setToken } = useToken()
    
    const [username, setUserName] = useState("")

    useEffect(() => {
        const data = localStorage.getItem('username')
        setUserName(data)
    }, [])
    

    function logMeOut() {
        axios({
          method: "POST",
          url:"http://127.0.0.1:5000/logout",
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
                <li className={styles.item}>
                    <Link href="/auth/login">
                        <a>Login</a>
                    </Link>
                </li>
                
            </ul>
        </div>
        <div className={styles.userName}>
            {/* TODO: drop down 组件, 包括logout，administrator link*/}
            { username!=="" && username!==undefined && !username
            ?<p></p>
            :(
                <>
                <p>Welcome, {username}!</p>
                <button onClick={logMeOut}> 
                    Logout
                </button>
                </>
            )
            }
        </div>
        </div>
    );
}