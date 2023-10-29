import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');

  const submit = e => {
    e.preventDefault();
    try {
      Meteor.loginWithPassword(email, password);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={submit} className="login-form">
      <label htmlFor="email">email</label>

      <input
        type="text"
        placeholder="email"
        name="email"
        required
        onChange={e => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>

      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Log In</button>

    </form>
  );
};