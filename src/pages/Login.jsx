import React, { useEffect } from 'react';
import styles from './Login.module.css';
import { useState } from 'react';
import PageNav from '../components/PageNav';

import { useAuth } from '../contexts/FakeAuthContext';
import { FAKE_USER } from '../components/UserProfile';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Login() {
  const [email, setEmail] = useState(FAKE_USER.email);
  const [password, setPassword] = useState(FAKE_USER.password);
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true });
    }
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, user]);
  function handleLogIn(e) {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    if (email && password) logIn(email, password);
    navigate('/app/cities');
  }
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onclick={handleLogIn}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
