import React from 'react'
import styles from './loader.module.css'
export const Loader = () => {
  return (
    <div className={`d-flex justify-content-center ${styles['center-loader']}`}>
        <div className={styles['lds-ellipsis']}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}
