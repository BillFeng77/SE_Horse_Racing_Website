import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../styles/menu.module.css'
import useToken from './useToken'
import axios from 'axios'
import { Button } from '@mui/material'

/**
 * menu component
 */
export default function Menu () {
  const { removeToken } = useToken()
  const [usertype, setUserType] = useState(null)
  const [username, setUserName] = useState(null)
  // use localStorage to store current state of user
  useEffect(() => {
    const name = localStorage.getItem('username')
    const usertype = localStorage.getItem('usertype')
    setUserName(name)
    setUserType(usertype)
  }, [])
 /**
 * log out button click function 
 * @function
 */
  function logMeOut () {
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/api/logout'
    })
      .then(() => {
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
      })
  }
  return (
        <>
        <div className={styles.header}>
            <b className={styles.title}>Horseracing</b>
        <div className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link href="/calendar">
                        Calendar
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link href="/horses">
                        Horse
                    </Link>
                </li>
                <li className={styles.item}>
                    <Link href="/forum">
                        Forum
                    </Link>
                </li>
            </ul>
        </div>

        <div className={styles.userName}>
            {username === null && usertype === null && (<div><Link href="/auth/login">
                        Login
                    </Link></div>)}
            { username !== null && usertype !== null
              ? (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>Welcome, {username}!</p>
                { usertype === 'admin'
                  ? (
                        <>
                        <Button variant='text' style={{ marginRight: '15px' }}>
                            <Link href="/admin">Admin</Link>
                        </Button>
                        </>
                    )
                  : <></>
                }
                <Button variant='text' onClick={logMeOut} className={styles.nav}>
                    Logout
                </Button>
                </div>
                )
              : <></>
            }
        </div>
        </div>
        </>

  )
}
