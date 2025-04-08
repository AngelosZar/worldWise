import React from 'react';
// import AppNav from '../components/AppNav';
// import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import Map from '../components/Map';
// import User from '../components/User';
// import User from '../components/User';
import styles from './AppLayout.module.css';

// import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {/* <User /> */}
    </div>
  );
}

export default AppLayout;
