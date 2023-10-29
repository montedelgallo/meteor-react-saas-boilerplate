// Importing necessary libraries and components
import React, { useEffect } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useParams } from 'react-router-dom';

// EmailVerification component
const EmailVerification = () => {
  // Getting the verification token from the URL parameters
  const { token } = useParams();

  console.log(token)

  // Verifying email on component mount
  useEffect(() => {
    Accounts.verifyEmail(token, (err) => {
      if (err) {
        // Display error message
        alert(err.message);
      } else {
        // Redirect to the home page or dashboard

        window.location.href = '/';
      }
    });
  }, [token]);

  console.log('ciao sono io')

  // Rendering a message while email verification is in progress
  return <div>Verifying your email...</div>;
};

export default EmailVerification;
