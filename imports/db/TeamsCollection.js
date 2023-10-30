// Importing necessary libraries
import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";
import { attachSchema } from 'meteor/aldeed:collection2';

// Creating the Teams and Users collections
export const Teams = new Mongo.Collection('teams');


// Schema for Teams collection
export const TeamSchema = new SimpleSchema({
  name: {
    type: String,
    max: 100,
  },
  stripeCustomerId: {
    type: String,
    optional: true,
  },
  ownerId: {
    type: String,
  },
  memberIds: {
    type: Array,
    optional: true,
  },
  teamKind: {
    type: String,
    allowedValues: ['public', 'private', 'personal'],
    defaultValue: 'personal',
  },
  'memberIds.$': {
    type: String,
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