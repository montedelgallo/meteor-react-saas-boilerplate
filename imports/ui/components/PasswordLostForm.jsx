// PasswordRecovery.jsx
import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';

const PasswordLostForm = () => {
  const [email, setEmail] = useState('');
  const [error,setError] = useState('');
  const [success,setSuccess] = useState('');
  const [loading,setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Accounts.forgotPassword({ email }, (err) => {
      if (err) {
        setLoading(false);
        // handle error
        setError(err.reason);
        setSuccess('Email sent. Please check your inbox to reset your password.');
      } else {
        setLoading(false);
        setSuccess('Email sent. Please check your inbox to reset your password.');
        // display success message
      }
    });
  };

  if (loading) return (<div className="text-center">Loading...</div>);

  if (success) return (<div className="text-center">{success}</div>);


  return (
    <form className="auth-form auth-signup-form"  onSubmit={handleSubmit}>
      {
        error && <div className="alert alert-danger">{error}</div>
      }
      <div className=" mb-3">
        <label className="sr-only" htmlFor="recoverEmail">Email</label>
        <input id="recoverEmail" name="recoverEmail" type="email" 
          className="form-control recoverEmail" placeholder="your@email.com" required="required" value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="text-center">
        <button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto">Send Email</button>
      </div>
    </form>
  );
};

export default PasswordLostForm;
