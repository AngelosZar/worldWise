import React from 'react';
// import Map from '../components/Map';
// import Sidebar from '../components/Sidebar';
// import User from '../components/User';
import PageNav from '../components/PageNav';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.app}>
      <PageNav />
      {/* <Sidebar />
      <Map />
      <User /> */}
    </div>
  );
}

export default AppLayout;
