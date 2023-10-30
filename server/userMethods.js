// Importing necessary libraries
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Teams } from '../imports/db/TeamsCollection';
// Registration method
Meteor.methods({
  'user.register'(args) {
    const { email, password, firstName, lastName } = args;
    // Creating a new user
    const userId = Accounts.createUser({ email, password, profile: { firstName, lastName } });
    // Sending a verification email
    Accounts.sendVerificationEmail(userId);
  },
  'user.teams'(userId) {
    return Teams.find({ ownerId: userId }).fetch();
  }
});