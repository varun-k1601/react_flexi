import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMenu = () => setIsMobileMenuOpen(false);
  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        Blog Application
      </Link>
      <div className={styles.links} style={{marginLeft: 'auto', marginRight: '80px', justifyContent: 'flex-end', gap: '32px'}}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/create" className={styles.link}>New Post</Link>
      </div>
      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      <div
        className={
          isMobileMenuOpen
            ? `${styles.mobileMenu} ${styles.mobileMenuOpen}`
            : styles.mobileMenu
        }
        aria-hidden={!isMobileMenuOpen}
      >
        <Link to="/" className={styles.mobileLink} onClick={closeMenu}>Home</Link>
        <Link to="/create" className={styles.mobileLink} onClick={closeMenu}>New Post</Link>
      </div>
      {isMobileMenuOpen && <div className={styles.overlay} onClick={closeMenu} tabIndex={-1} aria-hidden="true" />}
    </nav>
  );
};

export default NavBar;
