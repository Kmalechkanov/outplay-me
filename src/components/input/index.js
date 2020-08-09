import React from 'react'
import styles from './index.module.css'


const Input = ({ label, id, value, onChange, type }) => {

  return (
    <div className={styles.container}>
      <label htmlFor={id}>
        {label}:
      </label>
      <input type={type || 'text'} id={id} value={value} onChange={onChange} />
    </div>
  )
}

export default Input