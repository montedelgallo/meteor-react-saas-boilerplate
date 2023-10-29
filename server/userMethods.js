// Importing necessary libraries
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// Registration method
Meteor.methods({
  'user.register'(email, password) {
    // Creating a new user
    const userId = Accounts.createUser({ email, password });
    // Sending a verification email
    Accounts.sendVerificationEmail(userId);
  },
});