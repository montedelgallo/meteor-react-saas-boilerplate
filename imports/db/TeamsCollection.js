// Importing necessary libraries
import { Mongo } from 'meteor/mongo';

// Creating the Teams and Users collections
export const Teams = new Mongo.Collection('teams');
export const Users = Meteor.users;

// Schema for Teams collection
export const TeamSchema = new SimpleSchema({
  name: {
    type: String,
    max: 100,
  },
  ownerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  memberIds: {
    type: Array,
    optional: true,
  },
  'memberIds.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) return new Date();
      if (this.isUpsert) return { $setOnInsert: new Date() };
      this.unset();  // Prevent user from supplying their own value
    },
  },
});

// Attaching the schema to the Teams collection
Teams.attachSchema(TeamSchema);

// Indexes for Teams collection
Teams._ensureIndex({ ownerId: 1, name: 1 });