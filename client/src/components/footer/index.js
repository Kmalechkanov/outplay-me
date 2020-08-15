import React from 'react'
import styles from './index.module.css'

const Footer = (body) => {

    return (
        <footer className={styles.footer}>
            {body.children}
        </footer>
    )
}

export default Footer