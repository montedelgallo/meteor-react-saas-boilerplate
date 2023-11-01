// ResetPassword.jsx
import React, { useState } from 'react';
import { useParams } from 'wouter';
import { Accounts } from 'meteor/accounts-base';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { token } = useParams();  // assuming you have setup react-router
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(token)

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    Accounts.resetPassword(token, password, (err) => {
      if (err) {
        setLoading(false);
        // handle error
        setError(err.reason);
        setSuccess('Password reset failed. Please try again.');
      } else {
        setLoading(false);
        setSuccess('Password successfully reset.');
        // display success message
      }
    });
  };


  if (loading) return (<div className="text-center">Loading...</div>);

  if (success) return (<div className="text-center">{success}</div>);


  return (
    <form className="auth-form auth-signup-form" onSubmit={handleSubmit}>
      {
        error && <div className="alert alert-danger">{error}</div>
      }
      <div className=" mb-3">
        <label className="sr-only" htmlFor="password">New Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className=" mb-3">
        <label className="sr-only" htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter new password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto">Change Password</button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
