import React from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <span className={styles.navbarTitle}>Music Lyric Finder</span>
    </nav>
  )
}