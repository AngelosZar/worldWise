import React from 'react';
import styles from './User.module.css';
import { useAuth } from '../contexts/FakeAuthContext';
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  function handleClick() {
    logOut();
    navigate('/');
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
