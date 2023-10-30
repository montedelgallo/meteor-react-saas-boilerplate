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
    <form className="auth-form auth-signup-form" onSubmit={submit} >
      <div className="email mb-3">
        <label className="sr-only" htmlFor="signup-email">Email</label>
        <input id="signup-email" name="signup-email" type="email" className="form-control signup-email" placeholder="Email" required="required" value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="password mb-3">
        <label className="sr-only" htmlFor="signup-password">Password</label>
        <input id="signup-password" name="signup-password" type="password" className="form-control signup-password" placeholder="Create a password" required="required" value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="text-center">
          <button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto">Login</button>
      </div>
    </form>
  );
};