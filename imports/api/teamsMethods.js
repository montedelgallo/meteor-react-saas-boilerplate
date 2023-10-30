// Importing necessary libraries and collections
import { Meteor } from 'meteor/meteor';
import { Teams } from './collections';

// Methods for creating and managing teams
Meteor.methods({
  'teams.create'(name) {
    // Checking input arguments
    check(name, String);

    // Creating a new team with the current user as the owner
    const ownerId = this.userId;
    if (!ownerId) {
      throw new Meteor.Error('403', 'You must be logged in to create a team');
    }

    const teamId = Teams.insert({ name, ownerId });
    return teamId;
  },
  'teams.addMember'(teamId, memberId) {
    // Checking input arguments
    check(teamId, String);
    check(memberId, String);

    // Adding the member to the team
    Teams.update(teamId, { $addToSet: { memberIds: memberId } });
  },
  'teams.removeMember'(teamId, memberId) {
    // Checking input arguments
    check(teamId, String);
    check(memberId, String);

    // Removing the member from the team
    Teams.update(teamId, { $pull: { memberIds: memberId } });
  },
});