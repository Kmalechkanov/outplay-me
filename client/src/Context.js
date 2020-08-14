import React from 'react'

const UserContext = React.createContext({
    username: null,
    logIn: () =>{},
    logOut: () => {}
})

export default UserContext