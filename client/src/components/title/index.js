import React from 'react'
import styles from './index.module.css'

const Title = ({ title, className }) => {
    return (
        <div className={className}>
            <h1 className={styles.title}>{title}</h1>
        </div>
    )
}

export default Title