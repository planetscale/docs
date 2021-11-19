import React from 'react'

import styles from './HamburgerMenu.module.css'

const HamburgerMenu = ({ open }) => {
  return (
    <>
      <span className={styles.menuWrapper} data-open={open}>
        <span className={styles.menu}></span>
      </span>
    </>
  )
}

export default HamburgerMenu
