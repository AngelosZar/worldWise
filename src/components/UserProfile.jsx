import React from 'react';

const FAKE_USER = {
  name: import.meta.env.VITE_FAKE_USER_NAME,
  email: import.meta.env.VITE_FAKE_USER_EMAIL,
  password: import.meta.env.VITE_FAKE_USER_PASSWORD,
  avatar: import.meta.env.VITE_FAKE_USER_AVATAR,
};

function UserProfile() {
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {FAKE_USER.name}</p>
      <p>Email: {FAKE_USER.email}</p>
      <img src={FAKE_USER.avatar} alt="User avatar" />
    </div>
  );
}
export { FAKE_USER, UserProfile };
