import React from 'react'
import { useHistory } from "react-router-dom"
import styles from './index.module.css'

const Logout = ({link, event}) => {
    const history = useHistory()

    const logMeOut = () => {
        event()
        history.push(link)
    }

    return (
        <button className={styles.button} onClick={logMeOut}>LogOut</button>
    )
}

export default Logout