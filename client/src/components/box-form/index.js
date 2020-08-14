import React from 'react'
import styles from './index.module.css'

const BoxForm = ({ body }) => {
    return (
        <div className={styles.box}>{body}</div>
    )
}

export default BoxForm