import React, { useState, Component } from 'react'
import { Link, useHistory, Redirect } from "react-router-dom";
import { ExpiredCookie } from '../../Constants'
import Href from '../href'

const Logout = (link) => {
  const history = useHistory()

  const logout = (e) => {
    document.cookie = ExpiredCookie
    history.push("/login")
  }

  return (
    <Href link={link} push={true} title='LogOut' event={logout} />
  )
}

// class Logout extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       link: props.link
//     }
//   }

//   render() {
//     const { link } = this.state
//     const history = useHistory()

//     const logout = (e) => {
//       document.cookie = ExpiredCookie
//       history.push("/login")
//     }

//     // if (link) {
//     //   return <Redirect to={link} push={true} />
//     // }

//     return (
//       <Href link={link} push={true} title='LogOut' event={logout} />
//     )
//   }
// }

export default Logout