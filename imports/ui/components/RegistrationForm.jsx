// Importing necessary libraries and components
import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

// Register component
const RegistrationForm = () => {
  // Local state for handling form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Calling the user registration method
    Meteor.call('user.register', email, password, (err) => {
      if (err) {
        // Display error message
        alert(err.message);
      } 
    });
  };

  // Rendering the registration form
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
