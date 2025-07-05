import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = ({ onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMenu = () => setIsMobileMenuOpen(false);
  // Responsive: show search icon on mobile, full bar on desktop
  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        Blog Application
      </Link>
      <div className={styles.centerGroup}>
        <div className={styles.searchDesktop}>
          <SearchBar onSearch={onSearch} />
        </div>
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
      <button
        className={styles.mobileSearchIcon}
        onClick={() => setShowMobileSearch((v) => !v)}
        aria-label="Show search"
        style={{display: 'none'}}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="11" cy="11" r="7" strokeWidth="2" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {showMobileSearch && (
        <div className={styles.mobileSearchBar}>
          <SearchBar onSearch={onSearch} />
          <button className={styles.cancelBtn} onClick={() => setShowMobileSearch(false)} aria-label="Cancel search">Cancel</button>
        </div>
      )}
      <div
        className={
          isMobileMenuOpen
            ? `${styles.mobileMenu} ${styles.mobileMenuOpen}`
            : styles.mobileMenu
        }
        aria-hidden={!isMobileMenuOpen}
      >
        <div style={{padding: '8px 0'}}>
          <SearchBar onSearch={onSearch} />
        </div>
        <Link to="/" className={styles.mobileLink} onClick={closeMenu}>Home</Link>
        <Link to="/create" className={styles.mobileLink} onClick={closeMenu}>New Post</Link>
      </div>
      {isMobileMenuOpen && <div className={styles.overlay} onClick={closeMenu} tabIndex={-1} aria-hidden="true" />}
    </nav>
  );
};

export default NavBar;
