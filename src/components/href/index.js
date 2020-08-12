import React from 'react'
import styles from './index.module.css'
import {
  Link
} from 'react-router-dom'

const Href = ({ title, link, event }) => {
  return (
    <div className={styles['list-item']}>
      <Link to={link} className={styles.link} onClick={event}>
        {title}
      </Link>
    </div>
  )
}

export default Href