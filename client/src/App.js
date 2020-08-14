import React, { useState, useEffect } from 'react'
import UserContext from './Context'
import getCookie from './utils/cookie'
import { UserAPIUrl } from 'constants'
import logo from './svgs/logo.svg'
import './css/logo.css'

import * as Constants from './Constants'

const App = (props) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logIn = (user) => {
    setUser({
      ...user,
      loggedIn: true
    })
  }

  const logOut = () => {
    document.cookie = Constants.ExpiredCookie
    setUser({
      loggedIn: false
    })
  }

  useEffect(() => {
    const token = getCookie(Constants.TokenName)
    if (!token) {
      logOut()
      setLoading(false)
      return
    }

    // TODO change this
    fetch(Constants.UserAPIUrl + 'verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(async res => {
      console.log(res.status)
      let response = await res.json()
      console.log(response)
      if (res.status == 200) {
        logIn({
          username: response.username,
          email: response.email,
          id: response.id
        })
      } else {
        logOut()
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <UserContext.Provider value={{
      user,
      logIn,
      logOut
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default App