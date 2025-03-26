import React from 'react';
import styles from './Sidebar.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()}
        <br />
        <strong> By WorldWise inc</strong> - All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
