import React from 'react'
import Menu from '../../components/menu'
import Login from '../../components/login'
import useToken from '../../components/useToken'

/**
 * /login page
 */
function loginPage () {
  const { token, setToken } = useToken()
  return (
        <>
        <Menu/>
        {!token || token === '' || token === undefined
          ? <Login setToken={setToken}/>
          : (
            <h1 style={{
              "marginTop":"50px","display": "flex",
              "alignItems": "center",
              "justifyContent": "center"
            }}>
              You've already logged in
            </h1>
            )
        }
        </>
  )
}
export default loginPage
