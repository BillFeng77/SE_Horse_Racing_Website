import { useState } from 'react'

/** 
 * set token related functions
 * @return {function} setToken function
 * @return {string} token
 * @return {function} removeToken function 
 */
function useToken () {
  function getToken () {
    let userToken
    if (typeof window !== 'undefined') {
      userToken = localStorage.getItem('token')
    }
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken())

  function saveToken (userToken) {
    localStorage.setItem('token', userToken)
    setToken(userToken)
  };

  function removeToken () {
    localStorage.removeItem('token')
    setToken(null)
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }
}

export default useToken
