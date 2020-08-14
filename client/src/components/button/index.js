import React from 'react'
import styles from './index.module.css'

const Button = ({ text, onClick }) => {
    return (
        <button type="submit" className={styles.button} onClick={onClick}>{text}</button>
    )
}

export default Button