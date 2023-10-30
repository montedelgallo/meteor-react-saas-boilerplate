// Importing necessary libraries and components
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

// Register component
const RegistrationForm = () => {
  // Local state for handling form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Calling the user registration method
    try {
      await Meteor.callAsync('user.register', {
        email,
        password,
        firstName,
        lastName,
      });
      setLoading(false);
      // Redirecting to the email verification page
      // window.location.href = '/';
      // show message to verify email
      setSuccess('Please check your email to verify your account');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  

  if (success) {
    return (
      <div className="app-card alert alert-dismissible shadow-sm mb-4 border-left-decoration" role="alert">
        <div className="inner">
          <div className="app-card-body p-3 p-lg-4">
            <h3 className="mb-3">Welcome!</h3>
            <div className="row gx-5 gy-3">
              <div className="col-12 col-lg-9">
                <div>Check your email to activate your account!</div>
              </div>
              <div className="col-12 col-lg-3">
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }


  // Rendering the registration form
  return (
    <form className="auth-form auth-signup-form" onSubmit={handleSubmit}>

        {error && <div className="alert alert-danger">{error.reason}</div>}

        <div className="email mb-3">
          <label className="sr-only" for="signup-email">First Name</label>
          <input id="signup-name" name="signup-name" type="text" className="form-control signup-name" placeholder="Full name" required="required" value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="email mb-3">
          <label className="sr-only" for="signup-email">Last Name</label>
        <input id="signup-name" name="signup-name" type="text" className="form-control signup-name" placeholder="Full name" required="required" value={lastName}
          onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="email mb-3">
          <label className="sr-only" for="signup-email">Email</label>
          <input id="signup-email" name="signup-email" type="email" className="form-control signup-email" placeholder="Email" required="required" value={email}
        onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="password mb-3">
          <label className="sr-only" for="signup-password">Password</label>
          <input id="signup-password" name="signup-password" type="password" className="form-control signup-password" placeholder="Create a password" required="required" value={password}
        onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="extra mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="RememberPassword" />
            <label className="form-check-label" for="RememberPassword">
              I agree to Portal's <a href="#" className="app-link">Terms of Service</a> and <a href="#" className="app-link">Privacy Policy</a>.
            </label>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn app-btn-primary w-100 theme-btn mx-auto">Register</button>
        </div>
      </form>
  );
};

export default RegistrationForm;
