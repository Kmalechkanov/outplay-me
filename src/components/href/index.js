import React from 'react'
import styles from './index.module.css'
import {
  Link
} from 'react-router-dom'

const Href = ({ title, link }) => {
  return (
    <div className={styles['list-item']}>
      <Link to={link} className={styles.link}>
        {title}
      </Link>
    </div>
  )
}

export default Href