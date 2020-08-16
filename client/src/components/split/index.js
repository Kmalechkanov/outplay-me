import React from 'react'
import styles from './index.module.css'

const Split = ({ first, second }) => {

    return (
        <div className={styles.inline}>
            <h2 className={styles.alignLeft}>{first}</h2>
            <h2 className={styles.alignRight}>{second}</h2>
            <div styles="clear: both;"></div>
        </div>
    )
}

export default Split