import React from 'react'
import Menu from '../../components/menu'
import Login from '../../components/login'
import useToken from '../../components/useToken'

function loginPage () {
  const { token, setToken } = useToken()
  return (
        <>
        <Menu/>
        {!token || token === '' || token === undefined
          ? <Login setToken={setToken}/>
          : (
            <h1>You've already logged in</h1>
            )
        }
        </>
  )
}
export default loginPage
